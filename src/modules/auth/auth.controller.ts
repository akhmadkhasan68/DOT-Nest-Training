import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { LoginInterface } from 'src/interfaces/login.interface';
import { RefreshTokenInterface } from 'src/interfaces/refresh-token.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
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
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseInterface<LoginInterface>> {
    const data = await this.authService.login(loginDto);
    return { message: 'OK', data };
  }

  @Post('register')
  async reguster(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseInterface<User>> {
    const data = await this.authService.register(createUserDto);
    return { message: 'OK', data };
  }

  @Post('refresh-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<ResponseInterface<RefreshTokenInterface>> {
    const data = await this.authService.refreshAccessToken(
      refreshAccessTokenDto,
    );
    return { message: 'OK', data };
  }

  @Put('revoke-refresh-token/:id')
  async revokeRefreshToken(
    @Param('id') id: string,
  ): Promise<ResponseInterface<RefreshToken>> {
    const data = await this.refreshTokenService.revokeRefreshToken(id);
    return { message: 'OK', data };
  }
}
