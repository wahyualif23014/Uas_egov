// src/components/UI/Navbar.jsx
import React, { useState } from 'react';
import '../styles/navbar.css';

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'dokumen', label: '📂 Dokumen' },     // Baru
    { id: 'kinerja', label: '📈 e-Kinerja' },    // Baru
    { id: 'pengadaan', label: '🔨 Pengadaan' },  // Baru
    { id: 'profil', label: '🏛️ Profil' },        // Baru
    { id: 'komentar', label: '💬 Aspirasi' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('dashboard')}>
          <h1>E-GOV <span className="highlight">JOMBANG</span></h1>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'} 
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <button 
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;