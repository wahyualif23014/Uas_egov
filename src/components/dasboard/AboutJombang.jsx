// src/components/dasboard/AboutJombang.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/about-jombang.css';

const AboutJombang = () => {
  const cardsRef = useRef([]);
  const factsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    if (factsRef.current) observer.observe(factsRef.current);
    
    if (quoteRef.current) observer.observe(quoteRef.current);

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
      if (factsRef.current) observer.unobserve(factsRef.current);
      if (quoteRef.current) observer.unobserve(quoteRef.current);
    };
  }, []);

  const addToCardsRef = (el, index) => {
    cardsRef.current[index] = el;
  };

  return (
    <section className="about-jombang-section" id="about-jombang">
      {/* Parallax Background */}
      <div className="parallax-background">
        <div className="parallax-layer layer-1"></div>
        <div className="parallax-layer layer-2"></div>
        <div className="parallax-layer layer-3"></div>
      </div>
      
      {/* Main Content */}
      <div className="about-container">
        {/* Header Section */}
        <div className="about-header">
          <h2 className="about-title">Mengenal Kota Jombang</h2>
          <p className="about-subtitle">
            Kota Santri yang Kaya akan Sejarah, Budaya, dan Potensi
          </p>
        </div>

        {/* Content Grid */}
        <div className="about-content">
          {/* Cards Grid */}
          <div className="about-grid">
            {/* Sejarah Card */}
            <div 
              className="about-card history-card"
              ref={(el) => addToCardsRef(el, 0)}
            >
              <div className="card-icon"></div>
              <h3>Sejarah Singkat</h3>
              <p>
                Jombang berasal dari kata "Jumbang" yang berarti gemuruh, 
                mencerminkan semangat perjuangan rakyatnya. Memiliki warisan 
                sejarah sebagai pusat pendidikan Islam dengan pondok pesantren 
                bersejarah seperti Tebuireng yang didirikan oleh KH. Hasyim Asy'ari.
              </p>
            </div>

            {/* Geografi Card */}
            <div 
              className="about-card geography-card"
              ref={(el) => addToCardsRef(el, 1)}
            >
              <div className="card-icon"></div>
              <h3>Letak Geografis</h3>
              <p>
                Terletak di jantung Provinsi Jawa Timur pada koordinat 7°32' LS 
                dan 112°14' BT. Diapit oleh Kabupaten Nganjuk, Kediri, Mojokerto, 
                dan Malang. Memiliki topografi bervariasi dari dataran rendah 
                hingga pegunungan.
              </p>
            </div>

            {/* Budaya Card */}
            <div 
              className="about-card culture-card"
              ref={(el) => addToCardsRef(el, 2)}
            >
              <div className="card-icon"></div>
              <h3>Budaya & Tradisi</h3>
              <p>
                Sebagai "Kota Santri", Jombang memadukan nilai-nilai Islam 
                dengan kearifan lokal Jawa. Tradisi seperti "Nyadran", 
                "Grebeg Suro", dan kesenian "Reog" masih hidup dan dilestarikan 
                oleh masyarakat.
              </p>
            </div>

            {/* Ekonomi Card */}
            <div 
              className="about-card economy-card"
              ref={(el) => addToCardsRef(el, 3)}
            >
              <div className="card-icon"></div>
              <h3>Perekonomian</h3>
              <p>
                Bertumpu pada sektor pertanian (padi, jagung, tebu), perdagangan, 
                industri kecil, dan pariwisata religius. Sentra kerajinan 
                anyaman bambu dan industri kreatif terus berkembang mendukung 
                pertumbuhan ekonomi daerah.
              </p>
            </div>
          </div>

          {/* Highlight Facts */}
          <div 
            className="highlight-facts"
            ref={factsRef}
          >
            <h4> Fakta & Angka Penting</h4>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-number">1.2 Juta+</span>
                <span className="fact-label">Jiwa Penduduk</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">100+</span>
                <span className="fact-label">Pondok Pesantren</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">1.115 km²</span>
                <span className="fact-label">Luas Wilayah</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">21</span>
                <span className="fact-label">Kecamatan</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">306+</span>
                <span className="fact-label">Desa/Kelurahan</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">182 M+</span>
                <span className="fact-label">APBD 2024</span>
              </div>
            </div>
          </div>

          {/* Tourism Highlights */}
          <div className="about-grid">
            <div 
              className="about-card tourism-card"
              ref={(el) => addToCardsRef(el, 4)}
            >
              <div className="card-icon"></div>
              <h3>Wisata Sejarah</h3>
              <p>
                Museum KH. Hasyim Asy'ari, Makam KH. Wahid Hasyim, 
                dan Situs Trowulan menawarkan wisata edukasi dan spiritual 
                yang menarik bagi pengunjung.
              </p>
            </div>

            <div 
              className="about-card nature-card"
              ref={(el) => addToCardsRef(el, 5)}
            >
              <div className="card-icon"></div>
              <h3>Wisata Alam</h3>
              <p>
                Air Terjun Sumberawan, Waduk Pacal, dan perkebunan teh 
                Wonosari menawarkan pesona alam yang memukau untuk 
                melepas penat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJombang;