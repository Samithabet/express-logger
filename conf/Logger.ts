// config/logger.ts
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, colorize } = format;

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: combine(colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;
