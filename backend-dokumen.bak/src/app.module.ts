import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- 1. Pastikan ini di-import
import { DocumentsModule } from './documents/documents.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // 2. Tambahkan baris ini.
    // 'isGlobal: true' membuat ConfigService bisa dipakai di semua module lain.
    ConfigModule.forRoot({ isGlobal: true }),
    DocumentsModule,
    CommentsModule,
  ],
})
export class AppModule {}
