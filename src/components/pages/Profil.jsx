// src/components/pages/Profil.jsx
import React, { useState } from "react";
import "../styles/profile.css";
// Pastikan path image sesuai struktur folder Anda
import warsubi from "../../assets/warsubi.png"; 
import salma from "../../assets/salma.png"; 

const Profil = () => {
  // State untuk menyimpan data yang sedang dibuka (Leader atau OPD)
  const [activeItem, setActiveItem] = useState(null);

  const leaders = [
    {
      id: 1,
      name: "WARSUBI, S.H., M.Si",
      role: "BUPATI JOMBANG",
      image: warsubi, 
      bgColor: "#0AA06E",
      // Data tambahan untuk Modal
      bio: "Pemimpin visioner dengan fokus pada pembangunan infrastruktur berkelanjutan dan reformasi birokrasi yang transparan.",
      quote: "Membangun Jombang yang Berkarakter dan Berdaya Saing.",
      details: ["Pengalaman 20+ Tahun Birokrasi", "Fokus Ekonomi Kerakyatan", "Reformasi Layanan Publik"]
    },
    {
      id: 2,
      name: "M. SALMANUDIN, S.Ag., M.Pd",
      role: "WAKIL BUPATI JOMBANG",
      image: salma,
      bgColor: "#FF0000",
      bio: "Tokoh pendidikan dan agama yang berkomitmen meningkatkan kualitas sumber daya manusia dan kesejahteraan sosial.",
      quote: "Jombang Sejahtera, Jombang Beriman.",
      details: ["Ketua Berbagai Organisasi Sosial", "Penggerak Pendidikan Pesantren", "Pemerhati Kesehatan Masyarakat"]
    },
  ];

  const opd = [
    { title: "Humas & Protokol", summary: "Informasi publik, hubungan masyarakat dan protokoler.", emoji: "👥", desc: "Menjembatani komunikasi antara pemerintah daerah dengan masyarakat serta media massa." },
    { title: "Kominfo", summary: "Infrastruktur TI, layanan digital dan SPBE.", emoji: "💻", desc: "Mewujudkan Jombang Smart City melalui digitalisasi layanan publik dan keamanan informasi." },
    { title: "Dinas PUPR", summary: "Infrastruktur jalan, irigasi dan perumahan.", emoji: "🏗️", desc: "Pembangunan dan pemeliharaan infrastruktur fisik guna mendukung mobilitas ekonomi warga." },
    { title: "Dinas Kesehatan", summary: "Layanan kesehatan dan penurunan stunting.", emoji: "⚕️", desc: "Peningkatan kualitas layanan puskesmas, RSUD, dan program preventif kesehatan masyarakat." },
    { title: "Dinas Pendidikan", summary: "Mutu pendidikan dan budaya.", emoji: "📚", desc: "Pemerataan akses pendidikan berkualitas dan pelestarian budaya lokal Jombang." },
    { title: "Dinas Sosial", summary: "Layanan sosial dan kesejahteraan masyarakat.", emoji: "❤️", desc: "Penanganan masalah kesejahteraan sosial, bantuan bencana, dan pemberdayaan masyarakat rentan." },
    { title: "Bappeda", summary: "Perencanaan pembangunan dan evaluasi.", emoji: "📊", desc: "Merumuskan kebijakan perencanaan pembangunan daerah jangka menengah dan panjang." },
    { title: "BPKAD", summary: "Pengelolaan keuangan dan aset daerah.", emoji: "💰", desc: "Manajemen aset daerah dan transparansi anggaran pendapatan belanja daerah." },
  ];

  // Fungsi menutup modal
  const closeModal = () => setActiveItem(null);

  return (
    <div className="page-container profil-modern">

      <h2 className="profil-title">Profil Pemerintah Kabupaten Jombang</h2>

      {/* ==== LEADER SECTION ==== */}
      <div className="leader-showcase">
        {leaders.map((l) => (
          <div className="leader-box" key={l.id}>
            <div
              className="leader-photo-wrapper"
              style={{ background: l.bgColor }}
            >
              <img src={l.image} alt={l.name} className="leader-img" />
            </div>

            <h3 className="leader-name-main">{l.name}</h3>
            <p className="leader-role-main">{l.role}</p>

            <button 
              className="btn-outline-profile"
              onClick={() => setActiveItem({ type: 'leader', data: l })}
            >
              Tampilkan Profil
            </button>
          </div>
        ))}
      </div>

      {/* ==== OPD DIVISION ==== */}
      <h3 className="section-title-opd">Instansi / OPD Terkait</h3>

      <div className="opd-grid-2row">
        {opd.map((o, i) => (
          <div 
            key={i} 
            className="opd-card-modern" 
            onClick={() => setActiveItem({ type: 'opd', data: o })}
            style={{cursor: 'pointer'}} // Biar user tahu bisa diklik
          >
            <div className="opd-icon-modern">{o.emoji}</div>
            <h4 className="opd-title-modern">{o.title}</h4>
            <p className="opd-summary-modern">{o.summary}</p>
          </div>
        ))}
      </div>

      {/* ==== MODAL POPUP (THE COOL EXPERIENCE) ==== */}
      {activeItem && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div 
            className={`profile-modal-card ${activeItem.type === 'leader' ? 'modal-large' : 'modal-compact'}`} 
            onClick={(e) => e.stopPropagation()} // Supaya klik di card tidak menutup modal
          >
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            {/* TAMPILAN MODAL UNTUK LEADER */}
            {activeItem.type === 'leader' && (
              <div className="modal-leader-content">
                <div className="modal-leader-left" style={{background: `linear-gradient(135deg, ${activeItem.data.bgColor}22, transparent)`}}>
                   <img src={activeItem.data.image} alt={activeItem.data.name} className="modal-leader-img" />
                </div>
                <div className="modal-leader-right">
                   <span className="modal-badge">{activeItem.data.role}</span>
                   <h2>{activeItem.data.name}</h2>
                   <blockquote className="modal-quote">"{activeItem.data.quote}"</blockquote>
                   <p className="modal-bio">{activeItem.data.bio}</p>
                   
                   <div className="modal-tags">
                     {activeItem.data.details.map((detail, idx) => (
                       <span key={idx} className="tag-item">✨ {detail}</span>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* TAMPILAN MODAL UNTUK OPD */}
            {activeItem.type === 'opd' && (
              <div className="modal-opd-content">
                 <div className="modal-opd-icon">{activeItem.data.emoji}</div>
                 <h2>{activeItem.data.title}</h2>
                 <hr className="modal-divider"/>
                 <p className="modal-desc">{activeItem.data.desc}</p>
                 <button className="btn-modal-action">Kunjungi Website</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Profil;