import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshToken } from './entity/refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async reguster(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Put('revoke-refresh-token/:id')
  async revokeRefreshToken(@Param('id') id: string): Promise<RefreshToken> {
    return this.refreshTokenService.revokeRefreshToken(id);
  }
}
