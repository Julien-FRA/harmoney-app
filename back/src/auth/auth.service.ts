import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/jwt.type';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(createUserDto.email);
    if (existing) {
      throw new UnauthorizedException('Email déjà utilisé !');
    }

    const user = await this.usersService.createUser(createUserDto);
    return this.generateToken(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.password))
    ) {
      throw new UnauthorizedException('Identifiants invalides !');
    }
    return this.generateToken(user);
  }

  private generateToken(user: UserResponseDto) {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
