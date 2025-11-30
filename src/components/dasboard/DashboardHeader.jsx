// src/components/dasboard/DashboardHeader.jsx
import React from 'react';
// Pastikan CSS dashboard diimport di induk (App.jsx) atau di sini
// Jika belum ada, style ini akan mengandalkan CSS yang kita buat di langkah 2

const DashboardHeader = () => {
  return (
    <div className="header-card">
      <div className="header-text-content">
        <div className="typing-container">
          <h1 className="header-title">Budget Transparency & 
             Government Performance</h1>
        </div>
        <p className="header-subtitle fade-in-up">
          Pemerintahan Kabupaten Jombang 
        </p>
      </div>
      
      <div className="year-badge bounce-in">
        <div className="badge-content">
            <h2>2025</h2>
        </div>
        {/* Elemen dekorasi glow di belakang */}
        <div className="badge-glow"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;