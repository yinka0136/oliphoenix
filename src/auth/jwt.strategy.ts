import { User } from './user.entity';
import { TokenPayload } from './token-payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret22',
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    const { user_name } = payload;
    const user = await this.userRepository.findOne({ user_name });
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return user;
  }
}
