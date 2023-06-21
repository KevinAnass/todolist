import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guard/jwt.guard';
import { GetAuthDtoFromToken } from './decoder/GetAuthDtoFromToken.decoder';
import { sendPasswordResetCode } from 'utils/email/email.utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() dto: AuthDto) {
    return this.authService.SignUp(dto);
  }

  @Post('signIn')
  signIn(@Body() dto: AuthDto) {
    return this.authService.SignIn(dto);
  }

  @Get('isEmailExist/:email')
  isEmailExist(@Param('email') email) {
    return this.authService.IsEmailExist(email);
  }

  @UseGuards(JwtGuard)
  @Get('resetPassword')
  resetPassword(@GetAuthDtoFromToken() auth: AuthDto) {
    return this.authService.ResetPassword(auth);
  }
}
