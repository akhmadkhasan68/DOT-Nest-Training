import { User } from 'src/modules/user/entity/user.entity';

export interface LoginInterface {
  user: User;
  accessToken: string;
  refreshToken: string;
}
