// src/components/pages/Profil.jsx
import React from 'react';
import '../styles/pages.css';

const Profil = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">🏛️ Profil Pemerintah Daerah</h2>
      
      {/* Visi Misi */}
      <div className="glass-card" style={{marginBottom: '3rem', textAlign: 'center'}}>
        <h3 style={{color: '#8b5cf6'}}>Visi & Misi</h3>
        <p style={{fontStyle: 'italic', fontSize: '1.2rem'}}>"Terwujudnya Jombang yang Berkarakter dan Berdaya Saing"</p>
      </div>

      {/* Pimpinan */}
      <div className="profil-grid">
        <div className="profil-card">
            <div className="profil-img" style={{background: 'url(https://via.placeholder.com/100) center/cover'}}></div>
            <h3>Dr. H. Contoh Nama</h3>
            <p className="profil-role">Pj. Bupati Jombang</p>
        </div>
        <div className="profil-card">
            <div className="profil-img" style={{background: 'url(https://via.placeholder.com/100) center/cover'}}></div>
            <h3>H. Wakil Nama, S.E.</h3>
            <p className="profil-role">Sekretaris Daerah</p>
        </div>
        <div className="profil-card">
            <div className="profil-img" style={{background: 'url(https://via.placeholder.com/100) center/cover'}}></div>
            <h3>Drs. Kepala BPKAD</h3>
            <p className="profil-role">Kepala BPKAD</p>
        </div>
      </div>

      {/* Daftar OPD */}
      <div style={{marginTop: '3rem'}}>
        <h3 style={{borderBottom: '1px solid #333', paddingBottom: '10px'}}>Instansi / OPD Terkait</h3>
        <ul style={{listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px'}}>
            {['BPKAD', 'Bappeda', 'Dinas Kominfo', 'Dinas PU', 'Dinas Pendidikan', 'Dinas Kesehatan', 'Inspektorat', 'Dinas Sosial'].map(dinas => (
                <li key={dinas} style={{background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px'}}>🏢 {dinas}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profil;