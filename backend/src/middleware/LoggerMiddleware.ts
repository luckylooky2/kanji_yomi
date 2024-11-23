import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '../middleware/Logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const log = {
        log: `[${method}] ${originalUrl} ${statusCode} - ${duration}ms`,
        req: req.body,
        message: res.statusMessage,
      };
      if (200 <= statusCode && statusCode < 400) {
        logger.info(log);
      } else {
        logger.error(log);
      }
    });

    next();
  }
}
