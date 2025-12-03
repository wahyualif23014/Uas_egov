// Sample data for Kabupaten Jombang
export const budgetData = {
  currentYear: 2025,
  summary: {
    pendapatan: {
      planned: 2675792291720,
      realized: 2450000000000,
      percentage: 86
    },
    belanja: {
      planned: 3200000000000,
      realized: 2300000000000,
      percentage: 85
    },
    pembiayaan: {
      planned: 98715940271,
      realized: 15000000000,
      percentage: 50
    }
  },
  monthlyData: [
    { month: 'Jan', planned: 220, realized: 180 },
    { month: 'Feb', planned: 240, realized: 210 },
    { month: 'Mar', planned: 260, realized: 230 },
    { month: 'Apr', planned: 280, realized: 250 },
    { month: 'May', planned: 300, realized: 270 },
    { month: 'Jun', planned: 320, realized: 290 },
    { month: 'Jul', planned: 340, realized: 310 },
    { month: 'Aug', planned: 360, realized: 330 },
    { month: 'Sep', planned: 380, realized: 350 },
    { month: 'Oct', planned: 400, realized: 370 },
    { month: 'Nov', planned: 420, realized: 390 },
    { month: 'Dec', planned: 440, realized: 410 }
  ],
  yearComparison: [
    { year: 2021, pendapatan: 2200, belanja: 2100, pembiayaan: 100 },
    { year: 2022, pendapatan: 2400, belanja: 2280, pembiayaan: 120 },
    { year: 2023, pendapatan: 2650, belanja: 2520, pembiayaan: 130 },
    { year: 2024, pendapatan: 2850, belanja: 2720, pembiayaan: 130 }
  ]
}

export const formatCurrency = (value) => {
  if (value >= 1000000000000) {
    return `Rp ${(value / 1000000000000).toFixed(2)} T`
  } else if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(2)} M`
  } else if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(2)} Jt`
  }
  return `Rp ${value}`
}