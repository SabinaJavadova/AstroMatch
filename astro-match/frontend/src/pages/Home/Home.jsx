import React, { useEffect, useRef } from "react";
import "./Home.scss";

const Home = () => {
  const sections = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible"); // Section görünməz olduqda animasiyanı sıfırla
          }
        });
      },
      {
        threshold: 0.1, // Section 10% görünəndə animasiya başlasın
      }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{"AstroMatch ilə Yeni Yoldaşınızı Tapın!".replace(/i/g, "İ")}</h1>
          <p>
            AstroMatch, sizin bürcünüzə uyğun insanları tapmaq üçün buradadır.
          </p>
          <button>Başla</button>
        </div>
      </section>

      <section
        ref={(el) => (sections.current[0] = el)}
        className="features-section scroll-animation"
      >
        <h2>Fərqliliklərimiz</h2>
        <div className="feature-items">
          <div className="feature-item">
            <h3>Uyğun Bürclər</h3>
            <p>Bir çox bürc uyğunluğunu asanlıqla tapın.</p>
          </div>
          <div className="feature-item">
            <h3>Yüksək Təhlükəsizlik</h3>
            <p>Sizin məlumatlarınız bizə əmanət edilir.</p>
          </div>
          <div className="feature-item">
            <h3>Sadə İnterfeys</h3>
            <p>Çətinliksiz istifadəçi təcrübəsi.</p>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sections.current[1] = el)}
        className="about-section scroll-animation"
      >
        <h2>Biz Kimik?</h2>
        <p>
          AstroMatch, insanlara bürclərə əsaslanan uyğun əlaqələr tapmaqda kömək
          etmək üçün yaradılmışdır.
        </p>
        <button>Daha çox öyrənin</button>
      </section>

      <section
        ref={(el) => (sections.current[2] = el)}
        className="contact-section scroll-animation"
      >
        <h2>Bizimlə Əlaqə</h2>
        <p>Suallarınız varsa, bizə müraciət edin!</p>
        <button>Əlaqə qurun</button>
      </section>
    </div>
  );
};

export default Home;