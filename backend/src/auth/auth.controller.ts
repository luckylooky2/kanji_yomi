import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from 'src/decorator/roles';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import logger from 'src/middleware/Logger';
import { handleClientError } from 'src/utils/utils';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const logPrefix = 'Auth/login: ';
    try {
      const { email, password } = body;
      const { access_token, user } = await this.authService.login(
        email,
        password,
      );

      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: null, // session cookie
      });

      return res.json({ message: 'Login Successful', user });
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to login');
    }
  }

  @Post('/register')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(201)
  async register(@Body() body: { email: string; password: string }) {
    const logPrefix = 'Auth/register: ';
    try {
      const { email, password } = body;
      return this.authService.register(email, password, 'admin');
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to register');
    }
  }
}
