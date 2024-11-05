"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/logger.ts
const winston_1 = require("winston");
const { combine, timestamp, json, colorize } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), winston_1.format.simple()),
        }),
        new winston_1.transports.File({ filename: 'logs/app.log' }),
    ],
});
exports.default = logger;
