"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogService_1 = __importDefault(require("../services/LogService"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ExampleController {
    static getExample(req, res) {
        LogService_1.default.logMessage('Route /example was accessed.');
        res.send('Hello, World!');
    }
    // static getLogs(req: Request, res: Response): void {
    //     const fs = require('fs');
    //     const path = require('path');
    //     const logFilePath = path.join(__dirname, '../../logs/app.json');
    //     fs.readFile(logFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Could not retrieve logs' });
    //         }
    //         try {
    //             const logs = data
    //                 .split('\n')
    //                 .filter((line: string) => line)
    //                 .map((line: string) => JSON.parse(line));
    //             res.json(logs);
    //         } catch (parseError) {
    //             res.status(500).json({ error: 'Failed to parse logs' });
    //         }
    //     });
    // }
    // static getLogs(req: Request, res: Response): void {
    //     const logFilePath: string = path.join(__dirname, '../../logs/app.log');
    //     // Parse page and pageSize from the query parameters, set default values
    //     const page: number = parseInt(req.query.page as string, 10) || 1;
    //     const pageSize: number = parseInt(req.query.pageSize as string, 10) || 30;
    //     fs.readFile(logFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Could not retrieve logs' });
    //         }
    //         try {
    //             const logs: Record<string, unknown>[] = data
    //                 .split('\n')
    //                 .filter((line: string) => line)
    //                 .map((line: string) => JSON.parse(line));
    //             // Calculate pagination
    //             const startIndex: number = (page - 1) * pageSize;
    //             const endIndex: number = startIndex + pageSize;
    //             const paginatedLogs: Record<string, unknown>[] = logs.slice(startIndex, endIndex);
    //             // Send paginated results along with metadata
    //             res.json({
    //                 logs: paginatedLogs,
    //                 currentPage: page,
    //                 pageSize: pageSize,
    //                 totalLogs: logs.length,
    //                 totalPages: Math.ceil(logs.length / pageSize),
    //             });
    //         } catch (parseError) {
    //             res.status(500).json({ error: 'Failed to parse logs' });
    //         }
    //     });
    // }
    static getLogs(req, res) {
        const logFilePath = path_1.default.join(__dirname, '../../logs/app.log');
        // Parse page and pageSize from the query parameters, set default values
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 30;
        fs_1.default.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Could not retrieve logs' });
            }
            try {
                const logs = data
                    .split('\n')
                    .filter((line) => line)
                    .map((line) => {
                    try {
                        return JSON.parse(line);
                    }
                    catch (_a) {
                        return null; // Ignore lines that can't be parsed
                    }
                })
                    .filter((log) => log !== null);
                // Calculate pagination
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedLogs = logs.slice(startIndex, endIndex);
                // Send paginated results along with metadata
                res.json({
                    logs: paginatedLogs,
                    currentPage: page,
                    pageSize: pageSize,
                    totalLogs: logs.length,
                    totalPages: Math.ceil(logs.length / pageSize),
                });
            }
            catch (parseError) {
                res.status(500).json({ error: 'Failed to parse logs' });
            }
        });
    }
}
exports.default = ExampleController;
