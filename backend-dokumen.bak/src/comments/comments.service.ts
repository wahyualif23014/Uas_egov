import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommentsService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(CommentsService.name);

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') ?? '';
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY') ?? '';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Konfigurasi Supabase Gagal pada Comments Module');
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // 1. KIRIM KOMENTAR (Create)
  async create(createCommentDto: any) {
    const { data, error } = await this.supabase
      .from('comments')
      .insert({
        nama: createCommentDto.nama,
        pesan: createCommentDto.pesan,
        rating: createCommentDto.rating,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Gagal kirim komentar: ${error.message}`);
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  // 2. AMBIL SEMUA KOMENTAR (Read)
  async findAll() {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false }); // Yang terbaru di atas

    if (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
}
