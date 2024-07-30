import { Injectable } from '@nestjs/common';
import { spawnSync } from 'node:child_process';

@Injectable()
export class AppService {
  async getHello(): Promise<Buffer> {
    const resourceDir = process.env.RESOURCES_DIR;
    const embyDir = process.env.EMBY_DIR;
    const password = process.env.PASSWD_SUDO;

    console.log('Resource dir:', resourceDir);

    const args = ['-r', resourceDir, '-e', embyDir, '-p', password];

    const proc = spawnSync('sh', ['./scripts/move.sh', ...args]);

    return proc.stdout;
  }
}
