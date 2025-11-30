// src/components/pages/WelcomePage.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/WelcomePage.css";


const WelcomePage = ({ onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const containerRef = useRef(null);

  const features = [

  ];

  useEffect(() => {
    // Animasi entrance
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    const buttonTimer = setTimeout(() => setShowButton(true), 1500);

    // Feature carousel
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(buttonTimer);
      clearInterval(featureInterval);
    };
  }, [features.length]);

  const handleContinue = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      if (onContinue) onContinue();
    }, 800);
  }, [onContinue]);

  // Touch/Swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndY.current = e.touches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    
    if (diff > 0) {
      const progress = Math.min(diff / 150, 1);
      setSwipeProgress(progress);
    } else {
      setSwipeProgress(0);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartY.current - touchEndY.current;
    
    if (diff > 100) {
      handleContinue();
    } else {
      setSwipeProgress(0);
    }
    
    touchStartY.current = 0;
    touchEndY.current = 0;
  }, [handleContinue]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['Enter', ' ', 'Escape'].includes(e.key)) {
        e.preventDefault();
        handleContinue();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleContinue]);

  return (
    <div 
      ref={containerRef}
      className={`welcome-container ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Elements */}
      <div className="bg-blur-1"></div>
      <div className="bg-blur-2"></div>
      <div className="bg-blur-3"></div>

      {/* Main Content Wrapper */}
      <div className="welcome-content">
        
        {/* LEFT SIDE - Content & Logo */}
        <div className="welcome-left-side">
          
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-container">
              {/* Jika menggunakan image */}
              {/* <img src={logoImage} alt="Logo E-Gov Jombang" className="logo.png" /> */}
              
              {/* SVG Logo Alternative */}
              <div className="logo-icon">
                <svg 
                  viewBox="0 0 100 100" 
                  className="logo-svg"
                  role="img"
                  aria-label="Logo E-Gov Jombang"
                >
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
                  <path 
                    d="M30 35 L70 35 L70 50 L30 50 Z M30 55 L70 55 L70 65 L30 65 Z" 
                    fill="white" 
                    fillOpacity="0.95"
                  />
                  <circle cx="50" cy="50" r="8" fill="url(#innerGradient)" />
                </svg>
              </div>
              <div className="logo-glow"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-section">
            <h1 className="welcome-title">
              Selamat Datang di
              <span className="gradient-text">E-Gov Jombang</span>
            </h1>
            <p className="welcome-subtitle">
              Platform digital terintegrasi untuk pelayanan publik 
              yang lebih baik, cepat, dan transparan
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === activeFeature ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Section */}
          <div className="action-section">
            <button 
              className={`continue-button ${showButton ? 'show' : ''}`}
              onClick={handleContinue}
              aria-label="Masuk ke Dashboard"
            >
              <span>Masuk ke Dashboard</span>
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                className="button-icon"
                aria-hidden="true"
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>

            <div className="swipe-hint">
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20"
                className="swipe-icon"
              >
                {/* <path 
                  d="M12 5V19M12 5L5 12M12 5L19 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                /> */}
              </svg>
              {/* <span>Geser ke atas atau tekan Enter</span> */}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Animations */}
        <div className="welcome-right-side">
          <div className="animation-container">
            
            {/* Floating Shapes */}
            <div className="floating-shapes">
              <div className="floating-element el-1"></div>
              <div className="floating-element el-2"></div>
              <div className="floating-element el-3"></div>
              <div className="floating-element el-4"></div>
              <div className="floating-element el-5"></div>
            </div>

            {/* Dashboard Preview Card */}
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <h3 className="preview-title">Dashboard Preview</h3>
              </div>

              <div className="preview-stats">
                <div className="stat-item">
                  <div className="stat-value">2.85T</div>
                  <div className="stat-label">Total Anggaran</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">2.6T</div>
                  <div className="stat-label">Realisasi</div>
                </div>
              </div>

              <div className="preview-chart">
                <div className="chart-bar bar-1"></div>
                <div className="chart-bar bar-2"></div>
                <div className="chart-bar bar-3"></div>
                <div className="chart-bar bar-4"></div>
              </div>
            </div>

            {/* Floating Data Points */}
            <div className="data-points">
              <div className="data-point dp-1">
                <div className="dp-value">+25%</div>
                <div className="dp-label">Efisiensi</div>
              </div>
              <div className="data-point dp-2">
                <div className="dp-value">98%</div>
                <div className="dp-label">Kepuasan</div>
              </div>
              <div className="data-point dp-3">
                <div className="dp-value">15K+</div>
                <div className="dp-label">Pengguna</div>
              </div>
            </div>

            {/* Pulse Effect */}
            <div className="pulse-effect"></div>
          </div>
        </div>
      </div>

      {/* Swipe Progress Indicator */}
      {swipeProgress > 0 && (
        <div className="swipe-progress-bar">
          <div 
            className="swipe-progress-fill"
            style={{ width: `${swipeProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(WelcomePage);