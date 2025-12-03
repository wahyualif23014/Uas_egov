// src/components/pages/Dokumen.jsx
import React, { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';
import '../styles/documen.css'; // Pastikan CSS kamu tetap ada

const Dokumen = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State khusus loading upload
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    file: null // Ubah nama state jadi 'file' biar konsisten
  });
  
  const [categories, setCategories] = useState([]);

  // Load documents and categories on component mount
  useEffect(() => {
    loadDocuments();
    loadCategories();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentService.getDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.error('Error loading documents:', error);
      // alert('Gagal memuat data dokumen. Pastikan Backend NestJS jalan di Port 3001');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await documentService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Helper: Format Ukuran File (Bytes ke KB/MB)
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Helper: Format Tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Helper: Icon berdasarkan tipe
  const getFileIcon = (mimeType) => {
    if (!mimeType) return '📄';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('doc')) return '📝';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
    return '📎';
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      alert('Pilih file terlebih dahulu');
      return;
    }

    try {
      setIsUploading(true); // Mulai loading upload
      const formData = new FormData();
      
      // PENTING: Key ini harus sesuai dengan NestJS Controller
      // @UseInterceptors(FileInterceptor('file')) -> jadi key harus 'file'
      formData.append('file', uploadForm.file); 
      formData.append('title', uploadForm.title);
      formData.append('category', uploadForm.category);

      await documentService.uploadDocument(formData);
      
      alert('Dokumen berhasil diupload!');
      setShowUploadModal(false);
      setUploadForm({ title: '', category: '', file: null });
      loadDocuments(); // Refresh list otomatis
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload dokumen.');
    } finally {
      setIsUploading(false); // Selesai loading
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Validasi sederhana (opsional, karena backend juga handle)
    if (selectedFile) {
        setUploadForm(prev => ({ ...prev, file: selectedFile }));
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2 className="page-title">Portal Dokumen Resmi</h2>
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p>Memuat data dari server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Portal Dokumen Resmi</h2>
        <button 
          className="btn-upload"
          onClick={() => setShowUploadModal(true)}
        >
          Upload Dokumen
        </button>
      </div>

      {/* Documents List */}
      <div className="doc-list">
        {documents.length === 0 ? (
           <div className="empty-state">
             <h3>Belum ada dokumen</h3>
             <p>Silakan upload dokumen baru.</p>
           </div>
        ) : (
            documents.map((doc) => (
            <div key={doc.id} className="doc-card">
                <div className="doc-icon">
                {getFileIcon(doc.file_type)}
                </div>
                <div className="doc-info">
                <h3>{doc.title}</h3>
                <div className="doc-meta">
                    <span className="meta-item">
                    <span className="meta-icon">📅</span>
                    {/* Menggunakan 'created_at' dari backend */}
                    {formatDate(doc.created_at)} 
                    </span>
                    <span className="meta-item">
                    <span className="meta-icon">📦</span>
                    {/* Menggunakan 'file_size' dari backend */}
                    {formatSize(doc.file_size)}
                    </span>
                    {doc.category && (
                    <span className="meta-item">
                        <span className="meta-icon">📁</span>
                        {doc.category}
                    </span>
                    )}
                </div>
                </div>
                
                {/* Tombol Download Langsung dari URL Supabase */}
                <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-download"
                    style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px'}}
                >
                    <span className="download-icon">⬇</span> Download
                </a>
            </div>
            ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload Dokumen Baru</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="upload-form">
              <div className="form-group">
                <label>Judul Dokumen *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul dokumen"
                  required
                />
              </div>

              <div className="form-group">
                <label>Kategori *</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>File Dokumen (PDF/Word) *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
                <small>Maksimal upload sesuai setting server</small>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={!uploadForm.title || !uploadForm.category || !uploadForm.file || isUploading}
                >
                  {isUploading ? 'Mengupload...' : '📤 Upload Dokumen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dokumen;