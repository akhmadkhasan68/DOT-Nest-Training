import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RefreshTokens } from './entity/refresh-token.entity';
import { RefreshAccessTokenDto } from './dto/RefreshAccessTokenDto';
import { TokenExpiredError } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(RefreshTokens)
    private readonly refreshTokenRepository: Repository<RefreshTokens>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(data: LoginDto) {
    try {
      const { username, password } = data;
      const user = await this.usersService.validateUser(username, password);

      if (!user)
        throw new UnauthorizedException('Wrong E-Mail/Username or Password');

      const accessToken = await this.createAccessToken(user);
      const refreshToken = await this.createRefreshToken(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        id: payload.jid,
      },
      relations: ['user'],
    });

    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is not found!');
    if (refreshToken.isRevoked)
      throw new UnauthorizedException('Refresh token is revoked!');

    const access_token = await this.createAccessToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: Users): Promise<string> {
    const payload = {
      id: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async createRefreshToken(user: Users): Promise<string> {
    const expiresIn = 3600 * 24;
    const createRefreshToken = await this.generateRefreshToken(user, expiresIn);
    const payload = {
      jid: createRefreshToken.id,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
    });

    return refreshToken;
  }

  async register(data: RegisterDto) {
    try {
      const { name, username, email, password } = data;
      const salt = await bcrypt.genSalt();

      const userData = this.usersRepository.create();
      userData.name = name;
      userData.username = username;
      userData.email = email;
      userData.salt = salt;
      userData.password = await bcrypt.hash(password, salt);

      return await userData.save();
    } catch (error) {
      throw error;
    }
  }

  async generateRefreshToken(user: Users, ttl: number): Promise<RefreshTokens> {
    const refreshToken = this.refreshTokenRepository.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + ttl);
    refreshToken.expireAt = expireAt;

    return await refreshToken.save();
  }
}
