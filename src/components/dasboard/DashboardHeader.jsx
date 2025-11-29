// src/components/dasboard/DashboardHeader.jsx
import React from 'react';
// Pastikan CSS dashboard diimport di induk (App.jsx) atau di sini
// Jika belum ada, style ini akan mengandalkan CSS yang kita buat di langkah 2

const DashboardHeader = () => {
  return (
    <div className="header-card">
      <div className="header-text-content">
        {/* Wrapper untuk animasi mengetik */}
        <div className="typing-container">
          <h1 className="header-title">Welcome to Anggaran Daerah Jombang</h1>
        </div>
        <p className="header-subtitle fade-in-up">
          Kabupaten Jombang - Transparansi Pengelolaan APBD
        </p>
      </div>
      
      <div className="year-badge bounce-in">
        <div className="badge-content">
            <h2>2024</h2>
            <span>Tahun Anggaran</span>
        </div>
        {/* Elemen dekorasi glow di belakang */}
        <div className="badge-glow"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;