import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Menyu açıq olduqda səhifənin scroll olmasını qadağan et
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Scrollu dayandır
    } else {
      document.body.style.overflow = "auto"; // Scrollu aktiv et
    }

    // Cleanup funksiyası: Komponent unmount olduqda scrollu aktiv et
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="logo">
        <h1>AstroMatch</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <nav>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/Home" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleMenu}>Qeydiyyat</Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>Giriş</Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={toggleMenu}>My Profile</Link>
          </li>
          {token && (
            <li>
              <button onClick={handleLogout}>Çıxış</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;