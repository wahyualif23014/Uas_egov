// src/components/pages/Kinerja.jsx
import React, { useEffect, useState } from "react";
import "../styles/kinerja.css"; // pastikan path benar
import fotoBupati from "../../assets/1.jpg"; // pastikan file ada: src/assets/1.jpg
import wahyu from "../../assets/2.jpg"; // pastikan file ada: src/assets/1.jpg
import dontol from "../../assets/3.jpeg"; // pastikan file ada: src/assets/1.jpg
import hexa from "../../assets/4.webp"; // pastikan file ada: src/assets/1.jpg
import salman from "../../assets/5.jpg"; // pastikan file ada: src/assets/1.jpg
import agus from "../../assets/6.jpeg"; // pastikan file ada: src/assets/1.jpg
import endo from "../../assets/7.png"; // pastikan file ada: src/assets/1.jpg
import bayu from "../../assets/8.jpeg"; // pastikan file ada: src/assets/1.jpg


const AvatarPlaceholder = ({ size = 84 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="avatar placeholder"
  >
    <rect width="120" height="120" rx="16" fill="#e6e9ee" />
    <g transform="translate(20,18)" fill="#c3c8d6">
      <ellipse cx="40" cy="66" rx="28" ry="18" />
      <circle cx="40" cy="30" r="18" fill="#9aa3b8" />
    </g>
  </svg>
);

const Kinerja = () => {
  // track images yang gagal dimuat (pakai id)
  const [erroredIds, setErroredIds] = useState(new Set());
  // modal state
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leaders = [
    {
      id: 1,
      name: "Drs. H. Ahmad Fauzi",
      position: "Bupati Jombang",
      performancePct: 92,
      performanceNote: "Pelayanan publik & realisasi program prioritas",
      image: fotoBupati,
      details:
        "Menjalankan program prioritas: infrastruktur, layanan publik, dan kesehatan. Fokus pada percepatan pelayanan perizinan dan digitalisasi layanan desa."
    },
    {
      id: 2,
      name: "H. Warsubi, S.H., M.Si.",
      position: "Bupati Jombang",
      performancePct: 88,
      performanceNote: "Pengarah utama kebijakan pembangunan daerah",
      image: wahyu,
      details: "Penguatan pelayanan publik, Pemerataan pembangunan kecamatan & desa, Digitalisasi pemerintahan (SPBE), dan Pemberdayaan ekonomi kerakyatan."
    },
    {
      id: 3,
      name: "Ir. Mohammad Irawan",
      position: "Sekretaris Daerah",
      performancePct: 86,
      performanceNote: "Koordinasi perangkat daerah & tata kelola",
      image: dontol,
      details: "Fokus pada perbaikan tata kelola OPD, efisiensi anggaran, dan peningkatan kapasitas ASN."
    },
    {
      id: 4,
      name: "dr. Hexawan Tjahja Widada, M.KP",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Penurunan angka stunting & layanan kesehatan",
      image: hexa,
      details: "Program intervensi gizi, posyandu digital, dan peningkatan akses layanan kesehatan dasar di wilayah terpencil."
    },
    {
      id: 5,
      name: "KH M. Salmanudin Yazid, S.Ag., M.Pd.",
      position: "Wakil Bupati Jombang",
      performancePct: 90,
      performanceNote: "Koordinasi bidang sosial, pendidikan, dan pemberdayaan masyarakat.",
      image: salman,
      details: "Penguatan UMKM berbasis pesantren,Pemberdayaan pemuda & perempuan,Pengembangan pendidikan karakter,Kemitraan ormas & tokoh masyarakat"
    },
    {
      id: 6,
      name: "Agus Purnomo, S.H., M.Si..",
      position: "Sekretaris Daerah",
      performancePct: 90,
      performanceNote: "Pengelola utama koordinasi OPD & tata kelola birokrasi.",
      image: agus,
      details: "Reformasi birokrasi,Evaluasi kinerja OPD,Sinkronisasi perencanaan & anggaran,Penguatan pelayanan publik berbasis digital"
    },
    {
      id: 7,
      name: "Endro Wahyudi, S.STP.",
      position: "Kepala Dinas Kominfo",
      performancePct: 90,
      performanceNote: "Pengembangan digitalisasi layanan & infrastruktur informasi.",
      image: endo,
      details: "Penguatan SPBE,Layanan aduan publik digital,Pengamanan data pemerintah,Pengembangan jaringan internet publik"
    },
    {
      id: 8,
      name: "Bayu Pancoroadi, S.T., M.T.",
      position: "Kepala Dinas PUPR",
      performancePct: 90,
      performanceNote: "Pembangunan & pemeliharaan infrastruktur daerah.",
      image: bayu,
      details: "Perbaikan jalan & jembatan,Pengelolaan drainase & sanitasi,Pengembangan perumahan rakyat,Optimalisasi irigasi pertanian"
    },
  ];

  // ketika gambar error, tambahkan id ke erroredIds
  const handleImageError = (id) => {
    setErroredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // buka modal
  const openDetail = (leader) => {
    setSelected(leader);
    setIsModalOpen(true);
  };

  // tutup modal
  const closeDetail = () => {
    setIsModalOpen(false);
    // kecil delay supaya animasi (jika ada) dapat berfungsi; bersihkan selected
    setTimeout(() => setSelected(null), 120);
  };

  // tutup modal saat ESC
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
                      width={100}
                      height={100}
                      onError={() => handleImageError(p.id)}
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

      {/* Modal Detail */}
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
            <header className="modal-header">
              <h3 className="modal-title">{selected.name}</h3>
              <button className="modal-close" onClick={closeDetail} aria-label="Tutup detail">×</button>
            </header>

            <div className="modal-body">
              <div className="modal-left">
                <div className="modal-avatar">
                  {selected.image && !erroredIds.has(selected.id) ? (
                    <img src={selected.image} alt={`${selected.name} - foto`} className="leader-avatar" />
                  ) : (
                    <AvatarPlaceholder size={140} />
                  )}
                </div>
              </div>

              <div className="modal-right">
                <p className="modal-position"><strong>Jabatan:</strong> {selected.position}</p>
                <p className="modal-note"><strong>Ringkasan:</strong> {selected.performanceNote}</p>
                {selected.details && <p className="modal-details"><strong>Detail Program:</strong> {selected.details}</p>}

                <div className="modal-progress">
                  <label>Capaian: <strong>{selected.performancePct}%</strong></label>
                  <div className="progress-track small" aria-hidden="true">
                    <div className="progress-fill" style={{ width: `${Math.min(selected.performancePct, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <footer className="modal-footer">
              <button className="btn btn-primary" onClick={closeDetail}>Tutup</button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Kinerja;
