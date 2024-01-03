import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards, BadRequestException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signupDto';
import { LoginDto } from './dtos/loginDto';
import { JwtAuthGuard } from 'src/user/user.guard';
import { UserService } from 'src/user/user.service';
import { TempJwtAuthGuard } from './auth.guard';
import { User } from 'src/user/user.entity';

@Controller('authentication')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly jwtService: JwtService, private readonly userService: UserService) { }

	@Post("/signup")
	async postSignup(@Body() body: SignupDto) {
		if (!body.twoFa)
			return { message: await this.authService.postSignup(body) }
		await this.authService.postSignup(body);
		const code = await this.userService.generateTfaSecret(300, body.identifiant);
		const qrcode = this.userService.generateQrCode(code.otpauthUrl);
		return qrcode
	}

	@Post("/login")
	async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
		const userInfo = await this.authService.postLogin(body);
		if (userInfo.user.twoFa) {
			res.cookie('2fa_token', userInfo.access_token, {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				expires: new Date(Date.now() + 60 * 60 * 100),
			});
			return { twofa: "twacode" }
		}
		res.cookie('access_token', userInfo.access_token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
		return { message: "succces" }; // msg succes
	}

	@Post("/twoFa")
	@UseGuards(TempJwtAuthGuard)
	async postTwoFa(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body('token') token: string) {
		const user = req.user as User;
		const access_token = await this.authService.postTwoFa(user, token);
		res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
		res.clearCookie('2fa_token');
		return { message: user.twoFaSecret }; // msg succes
	}

	@Post("/api")
	async handleApiEndpoint(@Body() body: { code: string }, @Res({ passthrough: true }) res: Response): Promise<any> {
		const { code } = body;

		if (code) {
			try {
				//chope le token en appelant l api avec le code et l'env
				const token = await this.authService.getToken(code);

				//app call l'api pour avoir tout les infos de l'api(json)
				const profileData = await this.authService.getUserInfo(token.access_token);

				const userInfo = await this.authService.loginOrCreate(profileData.id, profileData.login, profileData);

				if (userInfo.user.twoFa) {
					res.cookie('2fa_token', userInfo.access_token, {
						httpOnly: true,
						secure: false,
						sameSite: "lax",
						expires: new Date(Date.now() + 60 * 60 * 100),
					});
					return { twofa: "twacode" }
				}
				res.cookie('access_token', userInfo.access_token, {
					httpOnly: true,
					secure: false,
					sameSite: "lax",
				});

				return { message: "succces" };
			} catch (error) {
				// Handle any errors here
				console.error(error);

				throw new BadRequestException('Failed to fetch data from the API');
			}
		}
	}

	@Get("/url")
	async getUrlApi(): Promise<any> {
		var authorize_url = process.env.API_AUTHORIZE;
		var redirect_url = encodeURIComponent(process.env.API_REDIRECT_URL);
		var client_uid = process.env.API_UID;

		const url = `${authorize_url}?client_id=${client_uid}&redirect_uri=${redirect_url}&response_type=code`;
		return { statusCode: HttpStatus.FOUND, url };
	}

	@UseGuards(JwtAuthGuard)
	@Get("/logout")
	async postLogout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token');
	}
}
