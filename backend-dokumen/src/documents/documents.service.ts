import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

// Interface kita taruh sini biar rapi
export interface Document {
  id?: number;
  title: string;
  category: string;
  file_url: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at?: string;
}

@Injectable()
export class DocumentsService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(DocumentsService.name);

  constructor(private configService: ConfigService) {
    // FIX ERROR TS2345 DISINI:
    // Tambahkan ?? '' agar jika tidak terbaca, dianggap string kosong dulu
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') ?? '';
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY') ?? '';

    // Validasi manual: Jika kosong, lempar error biar kita sadar
    if (!supabaseUrl || !supabaseKey) {
      this.logger.error('SUPABASE_URL atau SUPABASE_KEY belum ada di .env');
      throw new Error('Konfigurasi Supabase Gagal: Cek file .env Anda');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // 1. Fungsi untuk mendapatkan semua dokumen
  async findAll(): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
    // Pastikan mengembalikan array kosong [] jika data null
    return (data as Document[]) ?? [];
  }

  // 2. Fungsi untuk Upload File & Simpan Data
  async uploadFile(file: Express.Multer.File, title: string, category: string) {
    if (!file) throw new InternalServerErrorException('File tidak ditemukan');

    // Sanitasi nama file (ganti spasi dengan underscore)
    const cleanName = file.originalname.replace(/\s+/g, '_');
    const fileName = `${Date.now()}-${cleanName}`;
    const bucketName = 'official_docs'; // Pastikan nama bucket sesuai di Supabase

    // A. Upload fisik file ke Supabase Storage
    const { error: storageError } = await this.supabase.storage
      .from(bucketName)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (storageError) {
      this.logger.error(`Upload Storage Gagal: ${storageError.message}`);
      throw new InternalServerErrorException(storageError.message);
    }

    // B. Dapatkan Public URL
    const { data: publicUrlData } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    // C. Simpan Metadata ke Database
    const { data: dbData , error: dbError } = await this.supabase
      .from('documents')
      .insert({
        title: title,
        category: category ?? 'Umum',
        file_url: publicUrlData.publicUrl,
        file_path: fileName,
        file_type: file.mimetype,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) {
      this.logger.error(`Insert Database Gagal: ${dbError.message}`);
      // Opsional: Hapus file yg sudah terupload jika DB gagal
      await this.supabase.storage.from(bucketName).remove([fileName]);
      throw new InternalServerErrorException(dbError.message);
    }
    
    return dbData;
    }
}
