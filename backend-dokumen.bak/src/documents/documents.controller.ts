// src/documents/documents.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // JEMBATAN 1: Untuk Frontend mengambil data (GET)
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  // JEMBATAN 2: Untuk upload file (POST)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Nama 'file' harus sama dengan FormData di React
  uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('category') category: string,
  ) {
    return this.documentsService.uploadFile(file, title, category);
  }
}
