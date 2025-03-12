import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: { email: string; role: string } }> {
    // 1. 이메일로 사용자 조회
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('auth/login: Invalid credentials');
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('auth/login: Invalid credentials');
    }

    // 3. JWT 토큰 생성
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 4. 마지막 로그인 시간 업데이트
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return {
      access_token: token,
      user: { email: user.email, role: user.role },
    };
  }

  async register(email: string, password: string, role: string = 'user') {
    // 1. 이메일 중복 확인
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('auth/register: Email already exists');
    }

    // 2. 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. 사용자 저장
    const newUser = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      role,
    });

    await this.userRepository.save(newUser);

    return { message: 'User registered successfully', email: newUser.email };
  }
}
