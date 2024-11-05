"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// middlewares/loggerMiddleware.ts
const morgan_1 = __importDefault(require("morgan"));
const Logger_1 = __importDefault(require("../conf/Logger"));
const morganMiddleware = (0, morgan_1.default)(':method :url :status :response-time ms', {
    stream: {
        write: (message) => Logger_1.default.info(message.trim()),
    },
});
exports.default = morganMiddleware;
