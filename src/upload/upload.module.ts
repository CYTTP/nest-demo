import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import multer, { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename(req, file, callback) {
          const fileName = `${
            new Date().getDate() + extname(file.originalname)
          } `;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
