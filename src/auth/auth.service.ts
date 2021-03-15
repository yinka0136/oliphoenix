import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credential-DTO';
import { TokenPayload } from './token-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private _JWT: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async validateUser(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { user_name } = await this.userRepository.validateUser(
      authCredentialsDTO,
    );
    if (!user_name) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const payload: TokenPayload = { user_name };
    const accessToken = await this._JWT.sign(payload);
    return { accessToken };
  }
}
