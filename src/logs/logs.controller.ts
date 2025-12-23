import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) { }

    @Post('web-vitals')
    async logWebVitals(
        @Body() body: unknown,
        @Req() req: Request,
    ): Promise<{ status: 'ok' }> {
        await this.logsService.writeWebVitalsLog({
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            payload: body,
        });

        return { status: 'ok' };
    }
}
