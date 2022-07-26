import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RefreshAccessTokenDto } from './dto/RefreshAccessTokenDto';
import { RegisterDto } from './dto/RegisterDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('/register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('/refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.refreshAccessToken(refreshTokenDto);
  }
}
