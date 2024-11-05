"use strict";
// // config/logger.ts
// import { createLogger, format, transports } from 'winston';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { combine, timestamp, json, colorize } = format;
// const logger = createLogger({
//   level: 'info',
//   format: combine(timestamp(), json()),
//   transports: [
//     new transports.Console({
//       format: combine(colorize(), format.simple()),
//     }),
//     new transports.File({ filename: 'logs/app.log' }),
//   ],
// });
// export default logger;
const winston_1 = require("winston");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const { combine, timestamp, json, colorize } = winston_1.format;
aws_sdk_1.default.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});
const s3 = new aws_sdk_1.default.S3();
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), winston_1.format.simple()),
        }),
    ],
});
// Send logs to S3 in production environment
if (process.env.NODE_ENV === 'production') {
    logger.on('data', (log) => {
        const bucketName = 'aman-platform-production';
        if (!bucketName) {
            console.error("Error: S3_BUCKET_NAME environment variable is not set.");
            return;
        }
        const params = {
            Bucket: bucketName,
            Key: `logs/app-${new Date().toISOString()}.log`,
            Body: JSON.stringify(log),
            ContentType: 'application/json',
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading log to S3:', err);
            }
            else {
                console.log('Log uploaded to S3:', data.Location);
            }
        });
    });
}
exports.default = logger;
