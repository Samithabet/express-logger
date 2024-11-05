import logger from '../../conf/Logger';

class LogService {
    static logMessage(message: string): void {
        logger.info({  message });
    }
}

export default LogService;
