// src/components/pages/Dokumen.jsx
import React, { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';
import '../styles/documen.css'; // Ensure this path is correct

const Dokumen = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    file: null
  });
  
  const [categories, setCategories] = useState([]);

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

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', uploadForm.file); 
      formData.append('title', uploadForm.title);
      formData.append('category', uploadForm.category);

      await documentService.uploadDocument(formData);
      
      alert('Dokumen berhasil diupload!');
      setShowUploadModal(false);
      setUploadForm({ title: '', category: '', file: null });
      loadDocuments();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload dokumen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setUploadForm(prev => ({ ...prev, file: selectedFile }));
    }
  };

  return (
    <div className="doc-page-container">
      {/* HEADER SECTION */}
      <div className="doc-header">
        <div className="doc-header-text">
          <h2 className="doc-title">Portal Dokumen Resmi</h2>
          <p className="doc-subtitle">Akses dan unduh dokumen publik pemerintah daerah secara transparan.</p>
        </div>
        <button 
          className="btn-upload-modern"
          onClick={() => setShowUploadModal(true)}
        >
          <span className="icon-plus">+</span> Upload Dokumen
        </button>
      </div>

      {/* DOCUMENT GRID */}
      {loading ? (
        <div className="doc-loading">
          <div className="spinner"></div>
          <p>Memuat dokumen...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="doc-empty-state">
           <div className="empty-icon">📂</div>
           <h3>Belum ada dokumen</h3>
           <p>Silakan upload dokumen baru untuk memulai.</p>
        </div>
      ) : (
        <div className="doc-grid-layout">
          {documents.map((doc) => (
            <div key={doc.id} className="doc-item-card">
                <div className="doc-card-icon">
                  {getFileIcon(doc.file_type)}
                </div>
                
                <div className="doc-card-content">
                  <div className="doc-card-header">
                    <span className="doc-badge">{doc.category || 'Umum'}</span>
                    <h3 title={doc.title}>{doc.title}</h3>
                  </div>
                  
                  <div className="doc-card-meta">
                    <div className="meta-row">
                      <span className="meta-label">Ukuran</span>
                      <span className="meta-value">{formatSize(doc.file_size)}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Tanggal</span>
                      <span className="meta-value">{formatDate(doc.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="doc-card-actions">
                  <a 
                      href={doc.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-download-card"
                  >
                      Unduh File
                  </a>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="doc-modal-overlay">
          <div className="doc-modal-card">
            <div className="doc-modal-header">
              <h3>Upload Dokumen Baru</h3>
              <button className="doc-modal-close" onClick={() => setShowUploadModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="doc-modal-body">
              <div className="form-group-modern">
                <label>Judul Dokumen</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Contoh: Laporan Keuangan 2024"
                  required
                />
              </div>

              <div className="form-group-modern">
                <label>Kategori</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-modern file-input-group">
                <label>File Dokumen</label>
                <div className="file-drop-area">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileChange}
                    required
                    id="file-upload"
                  />
                  <div className="file-msg">
                    {uploadForm.file ? uploadForm.file.name : "Klik untuk memilih file (PDF, Word, Excel)"}
                  </div>
                </div>
                <small>Maksimal ukuran file sesuai ketentuan server.</small>
              </div>

              <div className="doc-modal-footer">
                <button 
                  type="button" 
                  className="btn-cancel-modern"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn-submit-modern"
                  disabled={!uploadForm.title || !uploadForm.category || !uploadForm.file || isUploading}
                >
                  {isUploading ? 'Mengupload...' : 'Simpan Dokumen'}
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