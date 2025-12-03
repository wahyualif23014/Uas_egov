// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/UI/Navbar.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Komentar from "./components/pages/komentar.jsx";
import WelcomePage from "./components/pages/WelcomePage.jsx";

// Import Halaman Baru (Sudah AKTIF)
import Dokumen from "./components/pages/Dokumen.jsx";
import Kinerja from "./components/pages/Kinerja.jsx";
import Pengadaan from "./components/pages/Pengadaan.jsx";
import Profil from "./components/pages/Profil.jsx";

import "./components/styles/dashboard.css";

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Remove localStorage check - always show welcome page first
  useEffect(() => {
    // Small delay to ensure everything is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    // Remove localStorage.setItem to always show welcome page
  }, []);

  const renderContent = useCallback(() => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'komentar': return <Komentar />;
      case 'dokumen': return <Dokumen />;
      case 'kinerja': return <Kinerja />;
      case 'pengadaan': return <Pengadaan />;
      case 'profil': return <Profil />;
      default: return <Dashboard />;
    }
  }, [activePage]);

  // Optimized swipe up detection for mobile
  useEffect(() => {
    if (!showWelcome) return;

    let startY = 0;
    let startTime = 0;
    let detected = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (detected) return;
      
      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      const timeElapsed = Date.now() - startTime;
      
      // More natural swipe detection with velocity
      if (diff > 80 && timeElapsed < 500) {
        detected = true;
        handleWelcomeComplete();
      }
    };

    const options = { passive: true };
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showWelcome, handleWelcomeComplete]);

  // Show loading state briefly
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #2D1B69 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div className="logo-icon">
          <svg viewBox="0 0 100 100" width="60" height="60">
            <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
            <path 
              d="M35 40 L65 40 L65 60 L35 60 Z" 
              fill="white" 
              fillOpacity="0.9"
            />
            <path 
              d="M40 45 L60 45 L60 55 L40 55 Z" 
              fill="url(#innerGradient)" 
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  // Always show welcome page first
  if (showWelcome) {
    return <WelcomePage onContinue={handleWelcomeComplete} />;
  }

  return (
    <div className="app-container">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ padding: '30px 20px', minHeight: '85vh' }}>
        {renderContent()}
      </main>
      
      {/* Footer Sederhana */}
      <footer style={{textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8rem'}}>
        © 2025 E-Gov Jombang. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;