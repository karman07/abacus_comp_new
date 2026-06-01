import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.userService.findByUsername(dto.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.userService.create({
      username: dto.username,
      password: dto.password,
      level: dto.level,
      role: dto.role || 'user',
    });

    return {
      message: 'User created successfully',
      user: { username: user.username, level: user.level },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Invalid username or password');

    const payload = {
      username: user.username, // ✅ Required
      role: user.role, // ✅ Required for role guard
    };

    const token = await this.jwtService.signAsync(payload);

    

    return {
      message: 'Login successful',
      access_token: token,
      level: user.level,
    };
  }
}
