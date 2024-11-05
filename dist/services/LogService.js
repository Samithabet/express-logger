"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../conf/Logger"));
class LogService {
    static logMessage(message) {
        Logger_1.default.info({ message });
    }
}
exports.default = LogService;
