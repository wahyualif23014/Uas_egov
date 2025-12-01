import React from "react";
import '../styles/kinerja.css';


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
  const leaders = [
    {
      id: 1,
      name: "Drs. H. Ahmad Fauzi",
      position: "Bupati Jombang",
      performancePct: 92,
      performanceNote: "Pelayanan publik & realisasi program prioritas",
      // image: '/assets/pemimpin1.jpg' // nanti ganti jika ada
    },
    {
      id: 2,
      name: "Hj. Siti Marlina",
      position: "Wakil Bupati",
      performancePct: 88,
      performanceNote: "Penguatan UMKM dan pemberdayaan lokal",
    },
    {
      id: 3,
      name: "Ir. Mohammad Irawan",
      position: "Sekretaris Daerah",
      performancePct: 86,
      performanceNote: "Koordinasi perangkat daerah & tata kelola",
    },
    {
      id: 4,
      name: "Dr. T. Rahayu",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Penurunan angka stunting & layanan kesehatan",
    },
    {
      id: 5,
      name: "Ir. Mohammad Irawan",
      position: "Sekretaris Daerah",
      performancePct: 86,
      performanceNote: "Koordinasi perangkat daerah & tata kelola",
    },
    {
      id: 6,
      name: "Dr. T. Rahayu",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Penurunan angka stunting & layanan kesehatan",
    },
    {
      id: 7,
      name: "Dr. T. Rahayu",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Penurunan angka stunting & layanan kesehatan",
    },
    {
      id: 8,
      name: "Ir. Mohammad Irawan",
      position: "Sekretaris Daerah",
      performancePct: 86,
      performanceNote: "Koordinasi perangkat daerah & tata kelola",
    },
    {
      id: 9,
      name: "Dr. T. Rahayu",
      position: "Kepala Dinas Kesehatan",
      performancePct: 90,
      performanceNote: "Penurunan angka stunting & layanan kesehatan",
    },
  ];

  return (
    <section className="leaders-wrap">
      <header className="leaders-header">
        <div className="leaders-header-left">
          <span className="leaders-section-tag">e-Kinerja 2024</span>

          <h2 className="leaders-title">
            Performa Pemimpin Kabupaten Jombang
          </h2>

          <p className="leaders-desc">
            Pemantauan capaian kinerja pimpinan daerah berdasarkan indikator
            strategis. Menampilkan foto, nama, jabatan, dan persentase capaian
            untuk memberikan transparansi bagi publik.
          </p>
        </div>

        <div className="leaders-header-accent">
          <div className="accent-line"></div>
        </div>
      </header>


      <div className="leaders-grid">
        {leaders.map((p) => (
          <article key={p.id} className="leader-card" aria-labelledby={`leader-${p.id}-name`}>
            <div className="leader-media">
              {/* Ganti AvatarPlaceholder dengan <img src={p.image} ...> jika sudah ada file */}
              <div className="avatar-wrap" aria-hidden="true">
                <AvatarPlaceholder size={100} />
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

              <div className="leader-progress">
                <div className="progress-track" aria-hidden="true">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min(p.performancePct, 100)}%` }}
                  />
                </div>
                <div className="progress-meta">
                  <span className="meta-label">Capaian</span>
                  <span className="meta-value">{p.performancePct}%</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Kinerja;
