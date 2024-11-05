import { Request, Response } from 'express';
import LogService from '../services/LogService';
import path from 'path';
import fs from 'fs';
class ExampleController {
    static getExample(req: Request, res: Response): void {
        LogService.logMessage('Route /example was accessed.');
    
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
    static getLogs(req: Request, res: Response): void {
        const logFilePath: string = path.join(__dirname, '../../logs/app.log');

        // Parse page and pageSize from the query parameters, set default values
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string, 10) || 30;

        fs.readFile(logFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                return res.status(500).json({ error: 'Could not retrieve logs' });
            }

            try {
                const logs: Record<string, unknown>[] = data
                    .split('\n')
                    .filter((line: string) => line)
                    .map((line: string) => {
                        try {
                            return JSON.parse(line);
                        } catch {
                            return null; // Ignore lines that can't be parsed
                        }
                    })
                    .filter((log) => log !== null) as Record<string, unknown>[];

                // Calculate pagination
                const startIndex: number = (page - 1) * pageSize;
                const endIndex: number = startIndex + pageSize;
                const paginatedLogs: Record<string, unknown>[] = logs.slice(startIndex, endIndex);

                // Send paginated results along with metadata
                res.json({
                    logs: paginatedLogs,
                    currentPage: page,
                    pageSize: pageSize,
                    totalLogs: logs.length,
                    totalPages: Math.ceil(logs.length / pageSize),
                });
            } catch (parseError) {
                res.status(500).json({ error: 'Failed to parse logs' });
            }
        });
    }
}

export default ExampleController;
