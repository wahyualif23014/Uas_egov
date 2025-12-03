// src/components/pages/Kinerja.jsx
import React, { useEffect, useState } from "react";
import "../styles/kinerja.css"; // Pastikan path CSS benar
import wahyu from "../../assets/1.jpg";
import hexa from "../../assets/3.webp";
import agus from "../../assets/2.jpeg";
import endo from "../../assets/4.png";
import bayu from "../../assets/8.jpeg";
import mifta from "../../assets/6.jpg";
import hari from "../../assets/7.webp";
import nur from "../../assets/8.webp";
import budi from "../../assets/9.png";
import hadi from "../../assets/10.webp";
import windari from "../../assets/11.webp";
import thonsom from "../../assets/12.webp";
import danang from "../../assets/13.jpg";

// Placeholder Avatar Component
const AvatarPlaceholder = ({ size = 84 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="avatar placeholder"
  >
    <rect width="120" height="120" rx="16" fill="#1e2430" />
    <g transform="translate(20,18)" fill="#2a303c">
      <ellipse cx="40" cy="66" rx="28" ry="18" />
      <circle cx="40" cy="30" r="18" fill="#3b4252" />
    </g>
  </svg>
);

const Kinerja = () => {
  const [erroredIds, setErroredIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leaders = [
    {
      id: 1,
      name: "Sugiat, M.Pd.",
      position: "Bupati Jombang",
      performancePct: 88,
      performanceNote: "Penanggung jawab utama pemerintahan dan arah pembangunan daerah.",
      image: wahyu,
      details: "Penguatan pelayanan publik, pemerataan pembangunan, pengendalian inflasi, dan peningkatan tata kelola pemerintahan."
    },
    {
      id: 2,
      name: "Dr. Agus Purnomo, S.STP., M.Si.",
      position: "Sekretaris Daerah",
      performancePct: 90,
      performanceNote: "Pengelola utama koordinasi OPD & birokrasi daerah.",
      image: agus,
      details: "Sinkronisasi kebijakan lintas OPD, pembinaan aparatur, dan peningkatan efektivitas tata kelola pemerintahan."
    },
    {
      id: 3,
      name: "dr. Hexawan Tjahja Widada, M.KP",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Pengarah peningkatan kesehatan masyarakat dan layanan kesehatan.",
      image: hexa,
      details: "Penurunan stunting, peningkatan layanan puskesmas, penguatan surveilans kesehatan, dan edukasi masyarakat."
    },
    {
      id: 4,
      name: "Endro Wahyudi, S.STP.",
      position: "Kepala Dinas Kominfo",
      performancePct: 90,
      performanceNote: "Pengembangan digitalisasi layanan & infrastruktur informasi.",
      image: endo,
      details: "Penguatan infrastruktur IT, pengembangan layanan digital publik, dan manajemen komunikasi pemerintah."
    },
    {
      id: 5,
      name: "Bayu Pancoroadi, S.T., M.T.",
      position: "Kepala Dinas PUPR",
      performancePct: 90,
      performanceNote: "Pembangunan & pemeliharaan infrastruktur daerah.",
      image: bayu,
      details: "Perbaikan jalan & jembatan, Pengelolaan drainase & sanitasi, Pengembangan perumahan rakyat, Optimalisasi irigasi pertanian."
    },
    {
      id: 6,
      name: "Miftahul Ulum, S.T., M.Si.",
      position: "Kepala Dinas PUPR", // Perhatikan: di data awal ada duplikasi posisi, sesuaikan jika perlu
      performancePct: 90,
      performanceNote: "Kepala Dinas Lingkungan Hidup", // Asumsi perbaikan data berdasarkan detail sebelumnya
      image: mifta,
      details: "Pengurangan sampah plastik, bank sampah, pengawasan industri pencemar, dan penghijauan."
    },
    {
      id: 7,
      name: "Hari Purnomo, A.P., M.E.",
      position: "Kepala Dinas Koperasi & Usaha Mikro",
      performancePct: 90,
      performanceNote: "Pembina koperasi dan pengembang UMKM daerah.",
      image: hari,
      details: "Revitalisasi koperasi, pelatihan UMKM, audit koperasi, serta fasilitasi pemasaran & modal."
    },
    {
      id: 8,
      name: "Nur Kamalia, S.K.M., M.Si.",
      position: "Kepala Dinas Ketahanan Pangan & Perikanan",
      performancePct: 90,
      performanceNote: "Penjaga ketahanan pangan dan pengembangan perikanan rakyat.",
      image: nur,
      details: "Pengawasan keamanan pangan, pemberdayaan petani & nelayan, budidaya ikan air tawar, dan stabilisasi harga."
    },
    {
      id: 9,
      name: "Budi Winarno, S.T., M.Si.",
      position: "Kepala Dinas Perhubungan",
      performancePct: 90,
      performanceNote: "Pengatur transportasi dan keselamatan jalan.",
      image: budi,
      details: "Penataan rambu & marka, pengembangan trayek, pengujian KIR, dan manajemen lalu lintas."
    },
    {
      id: 10,
      name: "Sholahuddin Hadi Sucipto",
      position: "Kepala Dinas Pemberdayaan Masyarakat & Desa",
      performancePct: 90,
      performanceNote: "Pengembang kapasitas desa dan kelembagaan masyarakat.",
      image: hadi,
      details: "Pendampingan pemerintahan desa, peningkatan kapasitas aparatur, dan penguatan program pembangunan desa."
    },
    {
      id: 11,
      name: "(PLH) Wor Windari, Dra., M.Si.",
      position: "Plh Kepala Dinas Pendidikan & Kebudayaan",
      performancePct: 90,
      performanceNote: "Penguat layanan pendidikan dan pelestarian budaya daerah.",
      image: windari,
      details: "Digitalisasi pendidikan, peningkatan kompetensi guru, revitalisasi sekolah, dan pelestarian seni budaya."
    },
    {
      id: 12,
      name: "Thonsom Pranggono, A.P., M.E.",
      position: "Kepala Satpol PP",
      performancePct: 90,
      performanceNote: "Penegak Perda dan ketertiban umum.",
      image: thonsom,
      details: "Penertiban PKL, pengawasan reklame, operasi gabungan, dan perlindungan aset daerah."
    },
    {
      id: 13,
      name: "Danang Praptoko, S.T., M.T.",
      position: "Kepala Bapenda",
      performancePct: 90,
      performanceNote: "Pengelola pendapatan daerah.",
      image: danang,
      details: "Optimalisasi PAD, modernisasi pajak digital, penertiban objek pajak, dan intensifikasi pajak."
    },
  ];

  const handleImageError = (id) => {
    setErroredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const openDetail = (leader) => {
    setSelected(leader);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scroll di belakang modal
  };

  const closeDetail = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Restore scroll
    setTimeout(() => setSelected(null), 300); // Tunggu animasi selesai
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="leaders-wrap">
      <header className="leaders-header">
        <div className="leaders-header-left">
          <span className="leaders-section-tag">e-Kinerja 2024</span>
          <h2 className="leaders-title">Performa Pemimpin Kabupaten Jombang</h2>
          <p className="leaders-desc">
            Pemantauan capaian kinerja pimpinan daerah berdasarkan indikator strategis. Klik kartu untuk melihat detail.
          </p>
        </div>
        <div className="leaders-header-accent">
          <div className="accent-line"></div>
        </div>
      </header>

      <div className="leaders-grid">
        {leaders.map((p) => {
          const imageAvailable = Boolean(p.image) && !erroredIds.has(p.id);
          return (
            <article
              key={p.id}
              className="leader-card"
              onClick={() => openDetail(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openDetail(p);
              }}
              aria-labelledby={`leader-${p.id}-name`}
            >
              <div className="leader-media">
                <div className="avatar-wrap" aria-hidden="true">
                  {imageAvailable ? (
                    <img
                      src={p.image}
                      alt={`${p.name} - foto`}
                      className="leader-avatar"
                      onError={() => handleImageError(p.id)}
                      loading="lazy"
                    />
                  ) : (
                    <AvatarPlaceholder size={100} />
                  )}
                </div>
              </div>

              <div className="leader-body">
                <div className="leader-top">
                  <div className="leader-info">
                    <h3 id={`leader-${p.id}-name`} className="leader-name">{p.name}</h3>
                    <p className="leader-position">{p.position}</p>
                  </div>
                  <div className="leader-performance">
                    <div className="perf-number">{p.performancePct}%</div>
                    <div className={`perf-chip ${p.performancePct >= 90 ? 'good' : p.performancePct >= 80 ? 'ok' : 'low'}`}>
                      {p.performancePct >= 90 ? 'Sangat Baik' : p.performancePct >= 80 ? 'Baik' : 'Perlu Perhatian'}
                    </div>
                  </div>
                </div>
                <p className="leader-note">{p.performanceNote}</p>
                <div className="leader-progress" aria-hidden="true">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${Math.min(p.performancePct, 100)}%` }} />
                  </div>
                  <div className="progress-meta">
                    <span className="meta-label">Capaian</span>
                    <span className="meta-value">{p.performancePct}%</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* MODAL DETAIL (POP-UP) */}
      {isModalOpen && selected && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) closeDetail();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Detail ${selected.name}`}
        >
          <div className="modal-card" role="document">
            <button className="modal-close-btn" onClick={closeDetail} aria-label="Tutup detail">
              &times;
            </button>
            
            <div className="modal-content-grid">
              <div className="modal-left-col">
                 <div className="modal-avatar-large">
                   {selected.image && !erroredIds.has(selected.id) ? (
                     <img src={selected.image} alt={selected.name} />
                   ) : (
                     <AvatarPlaceholder size={150} />
                   )}
                 </div>
                 <div className="modal-score-badge">
                    <span className="score-val">{selected.performancePct}%</span>
                    <span className="score-lbl">Kinerja</span>
                 </div>
              </div>

              <div className="modal-right-col">
                 <h2 className="modal-name">{selected.name}</h2>
                 <p className="modal-role">{selected.position}</p>
                 
                 <div className="modal-divider"></div>

                 <div className="modal-section">
                   <h4>Ringkasan Kinerja</h4>
                   <p>{selected.performanceNote}</p>
                 </div>

                 {selected.details && (
                   <div className="modal-section">
                     <h4>Program Unggulan & Detail</h4>
                     <p>{selected.details}</p>
                   </div>
                 )}

                 <div className="modal-progress-section">
                    <div className="progress-label-row">
                       <span>Progress Target Tahunan</span>
                       <span>{selected.performancePct}%</span>
                    </div>
                    <div className="progress-track modal-track">
                       <div className="progress-fill" style={{ width: `${Math.min(selected.performancePct, 100)}%` }}></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Kinerja;