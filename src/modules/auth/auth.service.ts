import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshTokenService } from './refresh-token.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { RefreshToken } from './entity/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.userService.vaidateUser(username, password);
    if (!user)
      throw new UnauthorizedException(
        'Combination of Username/E-Mail and Password is wrong!',
      );

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(
    refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshAccessTokenDto;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { id: payload.id },
      relations: { user: true },
    });

    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is not found!');
    if (refreshToken.isRevoked)
      throw new UnauthorizedException('Refresh token is revoked!');

    const accessToken = await this.createAccessToken(refreshToken.user);

    return { access_token: accessToken };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired!');
      } else {
        throw new InternalServerErrorException('Failed to decode token!');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async createRefreshToken(user: User): Promise<string> {
    const createRefreshToken =
      await this.refreshTokenService.createRefreshToken(
        user,
        +refreshTokenConfig.expiresIn,
      );
    const payload = {
      jid: createRefreshToken.id,
    };
    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );

    return refreshToken;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
}
