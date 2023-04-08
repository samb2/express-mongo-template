import winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import morgan from 'morgan';

const isDevelopment = process.env.NODE_ENV === 'development';
const isDebug = process.env.DEBUG === 'true';
const level = isDebug ? 'debug' : 'info';

// Set up a custom Winston format that logs the timestamp, level, message, and any additional properties as JSON
const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

// Set up a transport to log to the console at the info level
const consoleTransport = new winston.transports.Console({
    level,
    format: isDevelopment
        ? winston.format.combine(
              winston.format.colorize(),
              winston.format.errors({ stack: true }),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              winston.format.printf((info) => {
                  const { timestamp, level, message, stack } = info;
                  return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
              }),
          )
        : winston.format.simple(),
});
// Set up a transport to log to a file, rotating log files daily and keeping up to 30 days of logs
const fileTransport = new winstonDailyRotateFile({
    level: 'error',
    format: logFormat,
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d',
});

// Create a logger with the configured transports
const logger = winston.createLogger({
    level,
    transports: [consoleTransport, fileTransport],
});

// Add a stream to the logger that logs HTTP requests and responses to the console at the debug level
const httpStream = {
    write: (message: string) => {
        logger.debug(message.trim());
    },
};

// Use morgan middleware to log HTTP requests and responses
const morganFormat =
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const morganMiddleware = morgan(morganFormat, { stream: httpStream });

// Export the logger and middleware for use in other modules
export { logger, morganMiddleware };
