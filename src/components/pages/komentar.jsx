// src/components/pages/Komentar.jsx
import React, { useState, useEffect } from 'react';
import '../styles/komentar.css';

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    pesan: '',
    rating: 5 // Default angka 5
  });
  
  const [showNotification, setShowNotification] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // Untuk efek hover bintang

  useEffect(() => {
    const dataTersimpan = localStorage.getItem('komentarEgov');
    if (dataTersimpan) {
      setComments(JSON.parse(dataTersimpan));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('komentarEgov', JSON.stringify(comments));
  }, [comments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi khusus untuk handle klik bintang
  const handleRatingClick = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      nama: formData.nama,
      pesan: formData.pesan,
      rating: formData.rating,
      tanggal: new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    };

    setComments([newComment, ...comments]);
    setFormData({ nama: '', pesan: '', rating: 5 });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="komentar-container">
      {/* Notifikasi Popup */}
      {showNotification && (
        <div className="custom-notification">
            <div className="notif-icon">✅</div>
            <div className="notif-content">
                <h4>Aspirasi Terkirim!</h4>
                <p>Terima kasih atas masukan Anda.</p>
            </div>
        </div>
      )}

      <div className="header-section">
        <h2 className="title-glow">Suara Masyarakat</h2>
        <p className="subtitle">Waduh aspirasi digital untuk Jombang yang lebih baik.</p>
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

            {/* Input Rating Bintang Interaktif */}
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

            <button type="submit" className="btn-kirim-neon">
              🚀 Kirim Aspirasi
            </button>
          </form>
        </div>

        {/* LIST KOMENTAR */}
        <div className="comments-section">
          <h3 className="section-label">Aspirasi Terbaru</h3>
          <div className="comments-scroll">
            {comments.length === 0 ? (
              <div className="empty-state">Belum ada aspirasi masuk.</div>
            ) : (
              comments.map((item) => (
                <div key={item.id} className="comment-card-modern">
                  <div className="card-top">
                    <span className="user-avatar">{item.nama.charAt(0)}</span>
                    <div>
                      <h4 className="user-name">{item.nama}</h4>
                      <span className="comment-date">{item.tanggal}</span>
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