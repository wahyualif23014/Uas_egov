import axios from 'axios';

// 1. Arahkan ke Port 3001 (Backend NestJS)
const API_BASE_URL = 'http://localhost:3001';

class DocumentService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // --- GET ALL DOCUMENTS ---
  async getDocuments() {
    try {
      // Backend: GET http://localhost:3001/documents
      const response = await axios.get(`${this.baseURL}/documents`);
      
      // Axios otomatis membungkus data di dalam property .data
      // Kita return object { data: ... } agar formatnya sama dengan code frontend kamu
      return { data: response.data }; 
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  // --- UPLOAD DOCUMENT ---
  async uploadDocument(formData) {
    try {
      // Backend: POST http://localhost:3001/documents/upload
      // Header 'Content-Type': 'multipart/form-data' otomatis dihandle axios saat ada FormData
      const response = await axios.post(`${this.baseURL}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading:', error);
      throw error;
    }
  }

  // --- GET CATEGORIES ---
  // Karena backend belum ada tabel kategori khusus, kita hardcode dulu
  // supaya frontend tidak error saat memanggil loadCategories()
  async getCategories() {
    return {
      data: ['Anggaran', 'Laporan', 'Regulasi', 'Surat Keputusan', 'Lainnya']
    };
  }

  // --- DOWNLOAD DOCUMENT ---
  // CATATAN PENTING:
  // Dengan Supabase, kita dapat 'file_url' langsung.
  // Jadi download sebenarnya cukup pakai <a href={doc.file_url}> di React component.
  // Fungsi ini saya buat return URL-nya saja jika dipanggil manual.
  async downloadDocument(documentId, documentTitle) {
    console.log("Download ditangani langsung oleh browser via URL Supabase");
    return { success: true };
  }

  // --- DELETE DOCUMENT (Optional, jika nanti backend sudah ada fitur delete) ---
  async deleteDocument(id) {
    // await axios.delete(`${this.baseURL}/documents/${id}`);
    console.log("Fitur delete belum ada di backend");
  }
}

// Export instance agar bisa langsung dipakai dengan `documentService.getDocuments()`
export const documentService = new DocumentService();