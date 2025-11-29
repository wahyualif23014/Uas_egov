// src/components/pages/Pengadaan.jsx
import React from 'react';
import '../styles/pages.css';

const Pengadaan = () => {
  const projects = [
    { nama: "Peningkatan Jalan Ruas A-B", pagu: 2500000000, pelaksana: "PT. Maju Jaya", status: "Selesai" },
    { nama: "Rehabilitasi Gedung Sekolah X", pagu: 850000000, pelaksana: "CV. Abadi Konstruksi", status: "Proses" },
    { nama: "Pengadaan Alat Kesehatan RSUD", pagu: 1200000000, pelaksana: "PT. Medika Utama", status: "Selesai" },
    { nama: "Pembangunan Taman Kota Sektor 3", pagu: 450000000, pelaksana: "-", status: "Tender" },
    { nama: "Belanja Modal Laptop Dinas", pagu: 200000000, pelaksana: "CV. Tech Solusi", status: "Proses" },
  ];

  // Format Rupiah
  const formatRp = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  const getBadgeClass = (status) => {
    if (status === 'Selesai') return 'status-badge status-selesai';
    if (status === 'Proses') return 'status-badge status-proses';
    return 'status-badge status-tender';
  };

  return (
    <div className="page-container">
      <h2 className="page-title">🔨 Data Pengadaan Barang & Jasa</h2>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nama Paket Pekerjaan</th>
              <th>Nilai Pagu</th>
              <th>Pelaksana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item, index) => (
              <tr key={index}>
                <td style={{fontWeight: 'bold'}}>{item.nama}</td>
                <td>{formatRp(item.pagu)}</td>
                <td>{item.pelaksana}</td>
                <td><span className={getBadgeClass(item.status)}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pengadaan;