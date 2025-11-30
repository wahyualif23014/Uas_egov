import React from 'react'
import DashboardHeader from '../dasboard/DashboardHeader'
import BudgetSummary from '../dasboard/BudgetSummary'
import BudgetChart from '../dasboard/BudgetChart'
import YearComparison from '../dasboard/YearComparison'
import AboutJombang from '../dasboard/AboutJombang'

import { budgetData } from '../data/budgetData'
import '../styles/dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      
      <section className="dashboard-section">
        <h2 className="section-title">Ringkasan APBD 2024</h2>
        <BudgetSummary data={budgetData.summary} />
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Visualisasi Data</h2>
        <div className="charts-grid">
          <BudgetChart data={budgetData.monthlyData} />
          <YearComparison data={budgetData.yearComparison} />
        </div>
      </section>
      <section className='AboutJombang'>
        <h2 className="section-title">Tentang Jombang</h2>
        <AboutJombang />
      </section>
    </div>
  )
}

export default Dashboard