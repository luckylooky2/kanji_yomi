import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  userId: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // TODO: configService를 이용한 코드로 변경
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.userId, role: payload.role };
  }
}
