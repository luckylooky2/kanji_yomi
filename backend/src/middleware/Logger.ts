import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  // level: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, log }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${log}`;
        }),
      ),
      maxFiles: '1y',
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/app-%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, log, req }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${log} ${JSON.stringify({ req: req, message: message })}`;
        }),
      ),
      maxFiles: '1y',
    }),
    // new winston.transports.Console({
    //   level: 'debug',
    //   format: winston.format.combine(
    //     winston.format.colorize(),
    //     winston.format.simple(),
    //   ),
    // }),
  ],
});

export default logger;
