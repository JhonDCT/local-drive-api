import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async move(): Promise<string> {
    try {
      const stream = await this.appService.move();
      const text = await new Response(stream).text();

      return text;
    } catch (error) {
      const text = await new Response(error).text();

      return text;
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.appService.upload(file);
  }
}
