import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const createRefreshToken = this.refreshTokenRepository.create();
    createRefreshToken.user = user;
    createRefreshToken.isRevoked = false;

    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);
    createRefreshToken.expiredAt = expiredAt;

    return await this.refreshTokenRepository.save(createRefreshToken);
  }

  async getDetailRefreshToken(id: string): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findOneBy({ id });
    if (!refreshToken) throw new NotFoundException('Data not found!');

    return refreshToken;
  }

  async revokeRefreshToken(id: string): Promise<RefreshToken> {
    const refreshToken = await this.getDetailRefreshToken(id);
    refreshToken.isRevoked = true;

    return await refreshToken.save();
  }
}
