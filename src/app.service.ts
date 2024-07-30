import { Injectable } from '@nestjs/common';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs';

@Injectable()
export class AppService {
  getHello(): Promise<string> {
    const resourceDir = process.env.RESOURCES_DIR;
    const embyDir = process.env.EMBY_DIR;
    const password = process.env.PASSWD_SUDO;

    const args = ['-r', resourceDir, '-e', embyDir, '-p', password];
    const proc = spawn('sh', ['moves.sh', ...args]);

    return new Promise((resolve, reject) => {
      proc.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        resolve(data);
      });

      proc.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        reject(data);
      });
    });
  }

  upload(file): Promise<string> {
    const resourceDir = process.env.RESOURCES_DIR;

    return new Promise((resolve, reject) => {
      writeFile(resourceDir + '/' + file.originalname, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('File uploaded successfully');
        }
      });
    });
  }
}
