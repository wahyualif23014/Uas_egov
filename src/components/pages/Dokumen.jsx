// src/components/pages/Dokumen.jsx
import React from 'react';
import '../styles/pages.css';

const Dokumen = () => {
  const documents = [
    { id: 1, title: "Dokumen Pelaksanaan Anggaran (DPA) 2024", type: "PDF", size: "2.4 MB", date: "Jan 2024" },
    { id: 2, title: "Laporan Realisasi Semester I 2024", type: "PDF", size: "1.8 MB", date: "Jul 2024" },
    { id: 3, title: "Peraturan Daerah tentang APBD 2024", type: "PDF", size: "5.1 MB", date: "Dec 2023" },
    { id: 4, title: "Rencana Kerja Pemerintah Daerah (RKPD)", type: "PDF", size: "3.2 MB", date: "Jan 2024" },
    { id: 5, title: "Laporan Keuangan Pemerintah Daerah 2023", type: "PDF", size: "4.5 MB", date: "Mar 2024" },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">📂 Portal Dokumen Resmi</h2>
      <div className="doc-list">
        {documents.map((doc) => (
          <div key={doc.id} className="doc-card">
            <div className="doc-info">
              <h3>{doc.title}</h3>
              <div className="doc-meta">
                <span>📅 {doc.date}</span>
                <span>📦 {doc.size}</span>
                <span>📄 {doc.type}</span>
              </div>
            </div>
            <button className="btn-download" onClick={() => alert("Mengunduh dokumen...")}>
              ⬇ Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dokumen;