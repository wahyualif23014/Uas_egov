// src/components/pages/Dokumen.jsx
import React, { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';
import '../styles/pages.css';

const Dokumen = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    document: null
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
      alert('Gagal memuat data dokumen');
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

  const handleDownload = async (documentId, documentTitle) => {
    try {
      setDownloading(prev => ({ ...prev, [documentId]: true }));
      await documentService.downloadDocument(documentId, documentTitle);
      alert(`Dokumen "${documentTitle}" berhasil diunduh!`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Gagal mengunduh dokumen: ' + error.message);
    } finally {
      setDownloading(prev => ({ ...prev, [documentId]: false }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.document) {
      alert('Pilih file PDF terlebih dahulu');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', uploadForm.title);
      formData.append('category', uploadForm.category);
      formData.append('document', uploadForm.document);

      await documentService.uploadDocument(formData);
      
      alert('Dokumen berhasil diupload!');
      setShowUploadModal(false);
      setUploadForm({ title: '', category: '', document: null });
      loadDocuments(); // Refresh list
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload dokumen: ' + error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Hanya file PDF yang diizinkan');
      e.target.value = '';
      return;
    }
    setUploadForm(prev => ({ ...prev, document: file }));
  };

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      default:
        return '📎';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2 className="page-title">Portal Dokumen Resmi</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat dokumen...</p>
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

      {/* Statistics */}
      {/* <div className="doc-stats">
        <div className="stat-card">
          <h3></h3>
          <span className="stat-number">{documents.length}</span>
        </div>
        <div className="stat-card">
          <h3></h3>
          <span className="stat-number">
            {documents.reduce((total, doc) => {
              const size = parseFloat(doc.size) || 0;
              return total + size;
            }, 0).toFixed(1)} 
          </span>
        </div>
      </div> */}

      {/* Documents List */}
      <div className="doc-list">
        {documents.map((doc) => (
          <div key={doc.id} className="doc-card">
            <div className="doc-icon">
              {getFileIcon(doc.type)}
            </div>
            <div className="doc-info">
              <h3>{doc.title}</h3>
              <div className="doc-meta">
                <span className="meta-item">
                  <span className="meta-icon">📅</span>
                  {doc.date}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📦</span>
                  {doc.size}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📄</span>
                  {doc.type}
                </span>
                {doc.category && (
                  <span className="meta-item">
                    <span className="meta-icon">📁</span>
                    {doc.category}
                  </span>
                )}
              </div>
            </div>
            <button 
              className={`btn-download ${downloading[doc.id] ? 'downloading' : ''}`}
              onClick={() => handleDownload(doc.id, doc.title)}
              disabled={downloading[doc.id]}
            >
              {downloading[doc.id] ? (
                <>
                  <span className="download-spinner"></span>
                  Mengunduh...
                </>
              ) : (
                <>
                  <span className="download-icon">⬇</span>
                  Download
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {documents.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>Tidak ada dokumen tersedia</h3>
          <p>Upload dokumen pertama Anda</p>
        </div>
      )}

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
                <label>File PDF *</label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  required
                />
                <small>Hanya file PDF, maksimal 10MB</small>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowUploadModal(false)}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={!uploadForm.title || !uploadForm.category || !uploadForm.document}
                >
                  📤 Upload Dokumen
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