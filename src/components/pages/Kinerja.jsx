// src/components/pages/Kinerja.jsx
import React from 'react';
import '../styles/pages.css';

const Kinerja = () => {
  const kpiData = [
    { label: "Indeks Kepuasan Masyarakat", target: 90, realisasi: 92, unit: "Poin" },
    { label: "Pertumbuhan Ekonomi", target: 5.2, realisasi: 5.4, unit: "%" },
    { label: "Penurunan Angka Stunting", target: 12, realisasi: 14, unit: "%" },
    { label: "Tingkat Pengangguran Terbuka", target: 4.5, realisasi: 4.1, unit: "%" },
    { label: "Indeks Reformasi Birokrasi", target: 80, realisasi: 78, unit: "BB" },
    { label: "Opini BPK", target: "WTP", realisasi: "WTP", unit: "Predikat" },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">📈 Laporan Kinerja (e-Kinerja)</h2>
      <div className="kinerja-grid">
        {kpiData.map((item, index) => (
          <div key={index} className="kinerja-card">
            <div className="kinerja-meta">
              <span>Target: {item.target}</span>
              <span>Unit: {item.unit}</span>
            </div>
            <h3>{item.label}</h3>
            <div className="kinerja-val">
              {item.realisasi} <span style={{fontSize: '1rem', color:'#fff'}}>{item.unit}</span>
            </div>
            {/* Visual Bar Sederhana */}
            <div style={{width: '100%', height: '6px', background: '#333', borderRadius: '4px', marginTop: '10px'}}>
               <div style={{
                 width: typeof item.realisasi === 'number' ? '80%' : '100%', 
                 height: '100%', 
                 background: '#10b981', 
                 borderRadius: '4px'
               }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kinerja;