// src/data/budgetData.js

export const budgetData = {
  currentYear: 2025,
  lastUpdated: "Juni 2025", // Menandakan data berjalan
  summary: {
    pendapatan: {
      label: "Pendapatan Daerah",
      planned: 2675792291720, // Target APBD 2025 (±2.67 T)
      realized: 1150590685430, // Realisasi per pertengahan tahun (±43%)
      percentage: 43
    },
    belanja: {
      label: "Belanja Daerah",
      planned: 2850000000000, // Belanja biasanya lebih besar dari pendapatan (Defisit ditutup SiLPA)
      realized: 980000000000,  // Penyerapan belanja biasanya lambat di awal tahun (±34%)
      percentage: 34
    },
    pembiayaan: {
      label: "Pembiayaan Netto",
      planned: 174207708280,  // Sisa Lebih (SiLPA) tahun lalu untuk menutup defisit
      realized: 174207708280, // Biasanya langsung dibukukan
      percentage: 100
    }
  },
  // Data Grafik: Target vs Realisasi per Bulan (Simulasi 2025)
  monthlyData: [
    { month: 'Jan', planned: 150, realized: 120 },
    { month: 'Feb', planned: 300, realized: 280 },
    { month: 'Mar', planned: 550, realized: 500 },
    { month: 'Apr', planned: 800, realized: 720 },
    { month: 'May', planned: 1100, realized: 980 },
    { month: 'Jun', planned: 1400, realized: 1150 }, // Data Real berhenti di sini (bulan berjalan)
    { month: 'Jul', planned: 1700, realized: null },
    { month: 'Aug', planned: 2000, realized: null },
    { month: 'Sep', planned: 2300, realized: null },
    { month: 'Oct', planned: 2500, realized: null },
    { month: 'Nov', planned: 2700, realized: null },
    { month: 'Dec', planned: 2850, realized: null }
  ],
  // Data Grafik: Tren Tahunan (2022-2025)
  yearComparison: [
    { year: 2022, pendapatan: 2350, belanja: 2210, pembiayaan: 110 },
    { year: 2023, pendapatan: 2510, belanja: 2650, pembiayaan: 140 }, // Defisit wajar
    { year: 2024, pendapatan: 2600, belanja: 2720, pembiayaan: 150 },
    { year: 2025, pendapatan: 2675, belanja: 2850, pembiayaan: 174 }  // Target 2025
  ],
  // Komposisi Pendapatan (Untuk Pie Chart)
  revenueComposition: [
    { name: 'PAD (Pendapatan Asli Daerah)', value: 580000000000, color: '#10b981' }, // ±21%
    { name: 'Dana Transfer Pusat', value: 1950000000000, color: '#3b82f6' },        // ±73% (Dominan)
    { name: 'Lain-lain Pendapatan Sah', value: 145792291720, color: '#f59e0b' }     // ±6%
  ]
};

// Helper function formatting
export const formatCurrency = (value) => {
  if (!value) return "Rp 0";
  if (value >= 1000000000000) {
    return `Rp ${(value / 1000000000000).toFixed(2)} T`;
  } else if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(2)} M`;
  } else if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(2)} Jt`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
};