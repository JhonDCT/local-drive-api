import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<ReadableStream<Uint8Array>> {
    const resourceDir = Bun.env.RESOURCES_DIR;
    const embyDir = Bun.env.EMBY_DIR;
    const password = Bun.env.PASSWD_SUDO;

    const args = ['-r', resourceDir, '-e', embyDir, '-p', password];

    const proc = Bun.spawn(['sh', './scripts/move.sh', ...args]);

    return proc.stdout;
  }
}
