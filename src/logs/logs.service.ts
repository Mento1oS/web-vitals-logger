import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

interface WebVitalsLogEntry {
  ip?: string;
  userAgent?: string;
  payload: unknown;
}

@Injectable()
export class LogsService {
  private readonly logsDir = join(process.cwd(), 'logs');

  async writeWebVitalsLog(entry: WebVitalsLogEntry): Promise<void> {
    await this.ensureLogsDirExists();

    const filePath = this.getDailyLogFilePath();
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      ...entry,
    });

    await fs.appendFile(filePath, line + '\n', 'utf8');
  }

  private async ensureLogsDirExists(): Promise<void> {
    try {
      await fs.mkdir(this.logsDir, { recursive: true });
    } catch {
      // directory already exists or cannot be created
    }
  }

  private getDailyLogFilePath(): string {
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return join(this.logsDir, `web-vitals-${date}.txt`);
  }
}
