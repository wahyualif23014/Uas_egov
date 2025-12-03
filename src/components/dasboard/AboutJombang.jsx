import React, { useEffect, useRef } from 'react';
import { 
  MapPin, 
  History, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Mountain, 
  Utensils, 
  Landmark 
} from 'lucide-react';
import '../styles/about-jombang.css';

const AboutJombang = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef(null);

  // Helper untuk menambah ref ke array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing once visible
          // observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    
    cardsRef.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <History size={40} />,
      title: "Sejarah & Warisan",
      desc: "Berasal dari kata 'Ijo' dan 'Abang', mencerminkan harmoni kaum santri dan nasionalis. Rumah bagi tokoh bangsa seperti KH. Hasyim Asy'ari dan KH. Wahid Hasyim.",
      color: "var(--accent-purple)"
    },
    {
      icon: <MapPin size={40} />,
      title: "Letak Strategis",
      desc: "Berada di jantung Jawa Timur, persimpangan jalur utama Surabaya-Madiun-Solo dan Malang-Tuban. Memiliki luas 1.115 km² dengan 21 kecamatan.",
      color: "var(--accent-blue)"
    },
    {
      icon: <BookOpen size={40} />,
      title: "Kota Santri",
      desc: "Pusat pendidikan Islam legendaris dengan ratusan pondok pesantren, termasuk Tebuireng, Tambakberas, Denanyar, dan Darul Ulum.",
      color: "var(--accent-green)"
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Ekonomi",
      desc: "Didukung sektor agraris (tebu, padi) dan industri yang berkembang pesat. Sentra UMKM manik-manik ploso dan kerajinan cor kuningan.",
      color: "var(--accent-yellow)"
    },
    {
      icon: <Utensils size={40} />,
      title: "Kuliner Khas",
      desc: "Surga kuliner dengan Sego Sadukan, Pecel Lele, Kikil Jombang, dan Es Degan yang melegenda di lidah wisatawan.",
      color: "var(--accent-red)"
    },
    {
      icon: <Mountain size={40} />,
      title: "Pariwisata",
      desc: "Destinasi wisata religi Makam Gus Dur, keindahan alam Wonosari, hingga Kedung Cinet yang dijuluki 'Green Canyon' Jombang.",
      color: "var(--accent-teal)"
    }
  ];

  return (
    <section className="about-section" id="about-jombang">
      {/* Dynamic Background */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="about-container">
        {/* Header */}
        <div className="about-header" ref={titleRef}>
          <div className="badge-pill">Explore Jombang</div>
          <h2 className="main-title">
            Jantung Jawa Timur <br /> 
            <span className="text-gradient">Kota Beriman & Berkarakter</span>
          </h2>
          <p className="sub-title">
            Kabupaten Jombang bukan sekadar wilayah administratif, melainkan 
            pusat peradaban santri, sejarah perjuangan, dan potensi ekonomi yang terus bertumbuh.
          </p>
        </div>

        {/* Info Grid Cards */}
        <div className="info-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="info-card" 
              ref={addToCardsRef}
              style={{ transitionDelay: `${index * 100}ms` }} // Staggered delay
            >
              <div className="card-icon-wrap" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.desc}</p>
              <div className="card-shine"></div>
            </div>
          ))}
        </div>

        {/* Statistics Bar */}
        <div className="stats-container" ref={statsRef}>
          <div className="stat-box">
            <Users className="stat-icon" />
            <h4 className="stat-value">1.3 Juta+</h4>
            <p className="stat-label">Penduduk</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <Landmark className="stat-icon" />
            <h4 className="stat-value">306</h4>
            <p className="stat-label">Desa/Kelurahan</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <MapPin className="stat-icon" />
            <h4 className="stat-value">21</h4>
            <p className="stat-label">Kecamatan</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <TrendingUp className="stat-icon" />
            <h4 className="stat-value">4.8%</h4>
            <p className="stat-label">Pertumbuhan Ekonomi</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutJombang;