// src/components/pages/Profil.jsx
import React from "react";
import "../styles/pages.css";
import warsubi from "../../assets/warsubi.png"; 
import salma from "../../assets/salma.png"; 

const Profil = () => {
  const leaders = [
    {
      id: 1,
      name: "WARSUBI, S.H., M.Si",
      role: "BUPATI JOMBANG",
      image: warsubi, 
      bgColor: "#0AA06E",
    },
    {
      id: 2,
      name: "M. SALMANUDIN, S.Ag., M.Pd",
      role: "WAKIL BUPATI JOMBANG",
      image: salma,
      bgColor: "#FF0000",
    },
  ];

  const opd = [
    { title: "Humas & Protokol", summary: "Informasi publik, hubungan masyarakat dan protokoler.", emoji: "👥" },
    { title: "Kominfo", summary: "Infrastruktur TI, layanan digital dan SPBE.", emoji: "💻" },
    { title: "Dinas PUPR", summary: "Infrastruktur jalan, irigasi dan perumahan.", emoji: "🏗️" },
    { title: "Dinas Kesehatan", summary: "Layanan kesehatan dan penurunan stunting.", emoji: "⚕️" },
    { title: "Dinas Pendidikan", summary: "Mutu pendidikan dan budaya.", emoji: "📚" },
    { title: "Dinas Sosial", summary: "Layanan sosial dan kesejahteraan masyarakat.", emoji: "❤️" },
    { title: "Bappeda", summary: "Perencanaan pembangunan dan evaluasi.", emoji: "📊" },
    { title: "BPKAD", summary: "Pengelolaan keuangan dan aset daerah.", emoji: "💰" },
  ];

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

            <button className="btn-outline-profile">Tampilkan Profil</button>
          </div>
        ))}
      </div>

      {/* ==== OPD DIVISION 2 ROWS ==== */}
      <h3 className="section-title-opd">Instansi / OPD Terkait</h3>

      <div className="opd-grid-2row">
        {opd.map((o, i) => (
          <div key={i} className="opd-card-modern">
            <div className="opd-icon-modern">{o.emoji}</div>
            <h4 className="opd-title-modern">{o.title}</h4>
            <p className="opd-summary-modern">{o.summary}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profil;
