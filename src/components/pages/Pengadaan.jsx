// src/components/pages/Pengadaan.jsx
import React, { useMemo, useState } from "react";
import "../styles/pengadaan.css";

/* Placeholder image SVG */
const ImgPlaceholder = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="placeholder">
    <rect width="120" height="120" rx="12" fill="#f3f6fb" />
    <g transform="translate(14,16)" fill="#d6dde8">
      <rect x="0" y="56" width="92" height="18" rx="6" />
      <rect x="0" y="6" width="92" height="36" rx="6" fill="#c2ccd9" />
    </g>
  </svg>
);

/* Format number ke Rupiah */
function formatRupiah(n) {
  if (n == null) return "-";
  return "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* Generate many dummy entries */
const manyData = (() => {
  const categories = ["Infrastruktur", "Kesehatan", "Teknologi", "Pertanian", "Pendidikan", "Lingkungan", "Sosial"];
  const statusPool = ["Tender", "On Going", "Selesai", "Pembayaran", "Evaluasi"];
  const vendors = [
    "CV. Mandiri Jaya", "PT. Nusantara IT", "PT. Sehat Sentosa", "CV. Agro Mandiri",
    "PT. Karya Bangun", "CV. Jaya Abadi", "PT. Sinar Pertiwi", "PT. Lestari Teknik",
    "UD. Maju Sejahtera", "PT. Adhi Pratama"
  ];

  const titles = [
    "Pembangunan Jalan Desa", "Rehabilitasi Saluran Irigasi", "Pengadaan Alat Kesehatan Puskesmas",
    "Pengadaan Komputer OPD", "Renovasi Gedung Sekolah", "Pembangunan Jembatan Rangkap",
    "Pengadaan Alat Laboratorium", "Pembangunan Pasar Desa", "Pengadaan Kendaraan Operasional",
    "Pembangunan Drainase Kota", "Pengadaan Penerangan Jalan Umum", "Rehabilitasi Posyandu",
    "Pengadaan Peralatan Dapur Umum", "Renovasi Balai Desa", "Pelayanan Air Bersih",
    "Pembangunan Pos Kesehatan", "Pengadaan Alat Tulis Kantor", "Peningkatan Kapasitas UMKM",
    "Rehabilitasi TPU", "Pemeliharaan Jalan Kabupaten"
  ];

  const data = [];
  let idCounter = 1;

  for (let y of [2025, 2024, 2023]) {
    for (let i = 0; i < 12; i++) {
      const title = titles[(i + idCounter) % titles.length] + (i % 3 === 0 ? " - Paket " + ((i % 4) + 1) : "");
      const value = Math.floor((Math.random() * 20 + 1) * 50000000); // 50M - 1B range-ish
      const vendor = vendors[Math.floor(Math.random() * vendors.length)];
      const status = statusPool[Math.floor(Math.random() * statusPool.length)];
      const progress = status === "Selesai" ? 100 : Math.floor(Math.random() * 95);
      const category = categories[Math.floor(Math.random() * categories.length)];
      const id = `PGD-${String(idCounter).padStart(3, "0")}`;
      data.push({
        id,
        title,
        value,
        vendor,
        status,
        progress,
        year: y,
        category,
        note: `${title} untuk meningkatkan layanan masyarakat pada sektor ${category.toLowerCase()}.`,
        startDate: `2024-${String((i % 12) + 1).padStart(2, "0")}-01`,
        endDate: `2025-${String(((i+3) % 12) + 1).padStart(2, "0")}-15`,
      });
      idCounter++;
    }
  }

  // add a few specific ones with larger values
  data.push({
    id: "PGD-999",
    title: "Pembangunan Sistem Drainase Kota (Skala Besar)",
    value: 2500000000,
    vendor: "PT. Mega Konstruksi",
    status: "On Going",
    progress: 45,
    year: 2024,
    category: "Infrastruktur",
    note: "Proyek strategis untuk mitigasi banjir.",
    startDate: "2024-02-10",
    endDate: "2025-08-30",
  });

  return data;
})();

const Pengadaan = () => {
  const [year, setYear] = useState(2024);
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // recent | value-desc | value-asc | progress-desc | status
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const years = Array.from(new Set(manyData.map((d) => d.year))).sort((a,b)=>b-a);
  const categories = ["Semua", ...Array.from(new Set(manyData.map((d) => d.category)))].sort();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = manyData.filter((p) => {
      if (Number(p.year) !== Number(year)) return false;
      if (category !== "Semua" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });

    // sort
    switch (sortBy) {
      case "value-desc":
        arr.sort((a,b)=>b.value - a.value);
        break;
      case "value-asc":
        arr.sort((a,b)=>a.value - b.value);
        break;
      case "progress-desc":
        arr.sort((a,b)=>b.progress - a.progress);
        break;
      case "status":
        arr.sort((a,b)=> a.status.localeCompare(b.status));
        break;
      default:
        // recent: by id roughly insertion order (descending)
        arr.sort((a,b)=> {
          const an = Number(a.id.split("-")[1]);
          const bn = Number(b.id.split("-")[1]);
          return bn - an;
        });
    }

    return arr;
  }, [year, category, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageData = filtered.slice((currentPage-1)*pageSize, currentPage*pageSize);

  // Detail modal state
  const [detailItem, setDetailItem] = useState(null);

  function exportCSVAll() {
    const rows = filtered.length ? filtered : [];
    if (!rows.length) {
      const blob = new Blob(["No data"], { type: "text/csv;charset=utf-8;" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.setAttribute("download", `pengadaan_${year}.csv`);
      a.click();
      return;
    }

    const keys = ["id","title","vendor","value","status","progress","year","category","startDate","endDate"];
    const csv = [keys.join(",")].concat(
      rows.map(r =>
        keys.map(k => {
          let v = r[k] ?? "";
          if (k === "value") v = r.value;
          if (typeof v === "string") {
            v = v.replace(/"/g, '""');
            return `"${v}"`;
          }
          return v;
        }).join(",")
      )
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", `pengadaan_${year}.csv`);
    a.click();
  }

  return (
    <section className="pgd-wrap pgd-upgraded">
      <div className="pgd-header">
        <div className="pgd-left">
          <h2 className="pgd-title">Pengadaan & Kontrak Daerah</h2>
          <p className="pgd-sub">Monitoring paket pengadaan: nilai kontrak, vendor, status, dan realisasi.</p>

          <div className="pgd-stats">
            <div><strong>{manyData.filter(d=>Number(d.year)===Number(year)).length}</strong> total paket ({year})</div>
            <div><strong>{filtered.length}</strong> matching</div>
            <div><strong>{Math.round(filtered.reduce((a,b)=>a+(b.progress||0),0)/(filtered.length||1))}%</strong> rata-rata capaian</div>
          </div>
        </div>

        <div className="pgd-controls">
          <select className="pgd-select" value={year} onChange={(e)=>{ setYear(e.target.value); setPage(1); }}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select className="pgd-select" value={category} onChange={(e)=>{ setCategory(e.target.value); setPage(1); }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select className="pgd-select" value={sortBy} onChange={(e)=>{ setSortBy(e.target.value); }}>
            <option value="recent">Terbaru</option>
            <option value="value-desc">Nilai (Tertinggi)</option>
            <option value="value-asc">Nilai (Terendah)</option>
            <option value="progress-desc">Progress (Tertinggi)</option>
            <option value="status">Status (A-Z)</option>
          </select>

          <input
            className="pgd-search"
            placeholder="Cari paket / vendor / id..."
            value={query}
            onChange={(e)=>{ setQuery(e.target.value); setPage(1); }}
            aria-label="Cari pengadaan"
          />

          <button className="pgd-btn pgd-btn-outline" onClick={() => window.print()}>Print</button>
          <button className="pgd-btn pgd-btn-primary" onClick={exportCSVAll}>Export CSV</button>
        </div>
      </div>

      <div className="pgd-grid">
        {pageData.length === 0 ? (
          <div className="pgd-empty">Tidak ada data untuk kriteria ini.</div>
        ) : pageData.map(p => (
          <article key={p.id} className="pgd-card">
            <div className="pgd-card-left">
              <div className="pgd-thumb"><ImgPlaceholder size={96} /></div>

              <div className="pgd-meta">
                <div className="pgd-topline">
                  <span className="pgd-id">{p.id}</span>
                  <span className="pgd-cat">{p.category}</span>
                </div>

                <h3 className="pgd-title-card" title={p.title}>{p.title}</h3>
                <div className="pgd-vendor">{p.vendor}</div>
              </div>
            </div>

            <div className="pgd-card-right">
              <div className="pgd-row">
                <div className="pgd-value">{formatRupiah(p.value)}</div>
                <div className={`pgd-status ${p.status.replace(/\s/g,'-').toLowerCase()}`}>{p.status}</div>
              </div>

              <div className="pgd-progress">
                <div className="pgd-progress-track">
                  <div className="pgd-progress-fill" style={{ width: `${Math.min(p.progress,100)}%` }} />
                </div>
                <div className="pgd-progress-meta">
                  <span>Capaian</span>
                  <strong>{p.progress}%</strong>
                </div>
              </div>

              <div className="pgd-actions">
                <button className="small-btn" onClick={() => setDetailItem(p)}>Detail</button>
                <button className="small-btn-outline" onClick={() => alert("Buka dokumen (dummy)")}>Dokumen</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pgd-pagination">
        <div className="pgd-pager">
          <button onClick={() => setPage(1)} disabled={currentPage===1} className="pgd-page-btn">« First</button>
          <button onClick={() => setPage(s => Math.max(1, s-1))} disabled={currentPage===1} className="pgd-page-btn">‹ Prev</button>

          <div className="pgd-page-info">Hal {currentPage} dari {totalPages}</div>

          <button onClick={() => setPage(s => Math.min(totalPages, s+1))} disabled={currentPage===totalPages} className="pgd-page-btn">Next ›</button>
          <button onClick={() => setPage(totalPages)} disabled={currentPage===totalPages} className="pgd-page-btn">Last »</button>
        </div>
      </div>

      {/* Detail Modal (inline) */}
      {detailItem && (
        <div className="pgd-modal" role="dialog" aria-modal="true">
          <div className="pgd-modal-card">
            <header>
              <h3>{detailItem.title}</h3>
              <button className="modal-close" onClick={() => setDetailItem(null)}>✕</button>
            </header>

            <div className="pgd-modal-body">
              <div className="left">
                <div className="thumb-large"><ImgPlaceholder size={140} /></div>
                <div className="meta-block">
                  <div><strong>ID:</strong> {detailItem.id}</div>
                  <div><strong>Vendor:</strong> {detailItem.vendor}</div>
                  <div><strong>Nilai Kontrak:</strong> {formatRupiah(detailItem.value)}</div>
                  <div><strong>Status:</strong> {detailItem.status}</div>
                </div>
              </div>

              <div className="right">
                <p><strong>Periode:</strong> {detailItem.startDate} — {detailItem.endDate}</p>
                <p><strong>Catatan:</strong> {detailItem.note}</p>
                <p><strong>Category:</strong> {detailItem.category}</p>
                <p><strong>Progress:</strong> {detailItem.progress}%</p>
              </div>
            </div>

            <footer>
              <button className="pgd-btn" onClick={() => setDetailItem(null)}>Tutup</button>
              <button className="pgd-btn pgd-btn-primary" onClick={() => alert("Cetak detail (dummy)")}>Print</button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pengadaan;
