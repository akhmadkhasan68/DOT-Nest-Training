import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    try {
      return this.authService.login(data);
    } catch (error) {
      return error;
    }
  }

  @Post('/register')
  async register(@Body() data: RegisterDto) {
    try {
      return this.authService.register(data);
    } catch (error) {
      return error;
    }
  }
}
