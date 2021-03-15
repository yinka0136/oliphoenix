import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository, SimpleConsoleLogger } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from './dto/auth-credential-DTO';
import { User } from './user.entity';
import { TokenPayload } from './token-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { user_name, password } = authCredentialsDTO;
    const user = new User();
    user.user_name = user_name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else throw new InternalServerErrorException();
    }
  }

  async validateUser(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<TokenPayload> {
    const { user_name, password } = authCredentialsDTO;
    const user = this.findOne({ user_name });
    const isPasswordCorrect = bcrypt.compare(password, (await user).password);
    if (user && isPasswordCorrect) {
      return { user_name };
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
