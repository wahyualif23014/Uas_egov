// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/UI/Navbar.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Komentar from "./components/pages/komentar.jsx";

// Import Halaman Baru (Sudah AKTIF)
import Dokumen from "./components/pages/Dokumen.jsx";
import Kinerja from "./components/pages/Kinerja.jsx";
import Pengadaan from "./components/pages/Pengadaan.jsx";
import Profil from "./components/pages/Profil.jsx";

import "./components/styles/dashboard.css";

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'komentar': return <Komentar />;
      case 'dokumen': return <Dokumen />;
      case 'kinerja': return <Kinerja />;
      case 'pengadaan': return <Pengadaan />;
      case 'profil': return <Profil />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ padding: '30px 20px', minHeight: '85vh' }}>
        {renderContent()}
      </main>
      
      {/* Footer Sederhana */}
      <footer style={{textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8rem'}}>
        © 2024 E-Gov Jombang. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;