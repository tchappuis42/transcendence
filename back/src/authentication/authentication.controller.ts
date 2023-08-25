import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signupDto';
import { LoginDto } from './dtos/loginDto';
import { JwtAuthGuard } from 'src/user/user.guard';
import { UserService } from 'src/user/user.service';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService, private readonly jwtService: JwtService, private readonly userService: UserService) { }

	@Post("/signup")
	async postSignup(@Body() body: SignupDto) {
		if (!body.twoFa)
			return { message: await this.authService.postSignup(body) }
		await this.authService.postSignup(body);
		const code = await this.userService.generateTfaSecret(body.email);
		const qrcode = this.userService.generateQrCode(code);
		return qrcode
	}

	@Post("/login")
	async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
		const userInfo = await this.authService.postLogin(body);
		if (userInfo.user.twoFa) {
			res.cookie('access_token', userInfo.access_token, {
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

	@UseGuards(JwtAuthGuard)
	@Get("/logout")
	postLogout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token');
	}
}
