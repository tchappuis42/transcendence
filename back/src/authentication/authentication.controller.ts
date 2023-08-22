import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signupDto';
import { LoginDto } from './dtos/loginDto';
import { JwtAuthGuard } from 'src/user/user.guard';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService, private readonly jwtService: JwtService) { }

	@Post("/signup")
	async postSignup(@Body() body: SignupDto) {
		return { message: await this.authService.postSignup(body) }
	}

	@Post("/login")
	async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
		const access_token = await this.authService.postLogin(body);
		res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
		return access_token; // msg succes
	}

	@UseGuards(JwtAuthGuard)
	@Get("/logout")
	postLogout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token');
	}
}
