import { Injectable } from '@nestjs/common';
import { spawn } from 'node:child_process';

@Injectable()
export class AppService {
  getHello(): string {
    const resourceDir = process.env.RESOURCES_DIR;
    const embyDir = process.env.EMBY_DIR;
    const password = process.env.PASSWD_SUDO;

    const args = ['-r', resourceDir, '-e', embyDir, '-p', password];

    const proc = spawn('sh', ['move.sh', ...args]);

    proc.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      return data;
    });

    proc.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);

      return data;
    });

    return 'Move';
  }
}
