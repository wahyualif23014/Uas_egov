// src/components/pages/Komentar.jsx
import React, { useState, useEffect } from 'react';
import { commentService } from '../../services/commentService'; // Import Service
import '../styles/komentar.css';

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    pesan: '',
    rating: 5 
  });
  
  const [showNotification, setShowNotification] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load Komentar dari Backend saat halaman dibuka
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const data = await commentService.getComments();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  // 2. Handle Submit ke Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Kirim ke Backend NestJS
      await commentService.postComment({
        nama: formData.nama,
        pesan: formData.pesan,
        rating: formData.rating
      });

      // Reset Form & Tampilkan Notifikasi
      setFormData({ nama: '', pesan: '', rating: 5 });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Refresh list komentar agar yang baru muncul
      loadComments(); 
    } catch (error) {
      alert('Gagal mengirim aspirasi. Cek koneksi server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper Format Tanggal dari Timestamp Supabase
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="komentar-container">
      {/* Notifikasi Popup */}
      {showNotification && (
        <div className="custom-notification">
        </div>
      )}

      <div className="header-section">
        <h2 className="title-glow">Suara Masyarakat</h2>
        <p className="subtitle">Wadah aspirasi digital untuk Jombang yang lebih baik.</p>
      </div>

      <div className="content-wrapper">
        {/* FORM SECTION */}
        <div className="form-card glass-effect">
          <form onSubmit={handleSubmit}>
            
            {/* Input Nama */}
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input 
                type="text" 
                name="nama" 
                value={formData.nama} 
                onChange={handleChange} 
                placeholder="Siapa nama Anda?" 
                required 
                className="modern-input"
              />
            </div>

            {/* Input Rating Bintang */}
            <div className="input-group">
              <label>Tingkat Kepuasan</label>
              <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-btn ${star <= (hoverRating || formData.rating) ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
                <span className="rating-text">
                  {formData.rating === 5 ? "(Sangat Puas)" : 
                   formData.rating === 4 ? "(Puas)" : 
                   formData.rating === 3 ? "(Cukup)" : 
                   formData.rating === 2 ? "(Kurang)" : "(Buruk)"}
                </span>
              </div>
            </div>

            {/* Input Pesan */}
            <div className="input-group">
              <label>Isi Aspirasi</label>
              <textarea 
                name="pesan" 
                rows="5" 
                value={formData.pesan} 
                onChange={handleChange} 
                placeholder="Tulis kritik, saran, atau laporan Anda di sini..." 
                required 
                className="modern-input"
              ></textarea>
            </div>

            <button type="submit" className="btn-kirim-neon" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : ' Kirim Aspirasi'}
            </button>
          </form>
        </div>

        {/* LIST KOMENTAR */}
        <div className="comments-section">
          <h3 className="section-label">Aspirasi Terbaru</h3>
          <div className="comments-scroll">
            {loading ? (
                <p style={{textAlign: 'center', color: '#fff'}}>Memuat aspirasi...</p>
            ) : comments.length === 0 ? (
              <div className="empty-state">Belum ada aspirasi masuk. Jadilah yang pertama!</div>
            ) : (
              comments.map((item) => (
                <div key={item.id} className="comment-card-modern">
                  <div className="card-top">
                    <span className="user-avatar">{item.nama.charAt(0).toUpperCase()}</span>
                    <div>
                      <h4 className="user-name">{item.nama}</h4>
                      <span className="comment-date">{formatDate(item.created_at)}</span>
                    </div>
                    <div className="static-stars">{"★".repeat(item.rating)}</div>
                  </div>
                  <p className="comment-text">{item.pesan}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Komentar;