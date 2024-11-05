// // config/logger.ts
// import { createLogger, format, transports } from 'winston';

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
import { createLogger, format, transports } from 'winston';
import AWS from 'aws-sdk';
require('dotenv').config()
const { combine, timestamp, json, colorize } = format;
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});
const s3 = new AWS.S3();


const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: combine(colorize(), format.simple()),
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

    s3.upload(params, (err:any, data: any) => {
      if (err) {
        console.error('Error uploading log to S3:', err);
      } else {
        console.log('Log uploaded to S3:', data.Location);
      }
    });
  });
}


export default logger;
