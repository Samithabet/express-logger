// middlewares/loggerMiddleware.ts
import morgan from 'morgan';
import logger from '../conf/Logger';

const morganMiddleware = morgan(':method :url :status :response-time ms', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

export default morganMiddleware;
