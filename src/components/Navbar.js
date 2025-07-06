import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaTimes } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/" className="navbar__logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={process.env.PUBLIC_URL + '/IPADEV-logo.png'} alt="IPADEV Logo" className="navbar__logo-img" />
          <span className="navbar__org-name">Inclusive Pathway Development Initiative (IPADEV)</span>
        </a>
      </div>
      <div className="navbar__center">
        <a href="#" className="navbar__link">Our Vision</a>
        <a href="#" className="navbar__link">Areas of Focus</a>
        <a href="#" className="navbar__link">Get Involved</a>
        <a href="#" className="navbar__link">Meet the Team</a>
      </div>
      <div className="navbar__right">
        <div className="navbar__socials">
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
        <button className="navbar__contact">Contact us <span className="arrow">→</span></button>
        <button className="navbar__hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <RxHamburgerMenu />
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="navbar__mobile-overlay">
          <button className="navbar__close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <FaTimes />
          </button>
          <div className="navbar__mobile-menu">
            <a href="#" className="navbar__link" onClick={() => setMobileMenuOpen(false)}>Our Vision</a>
            <a href="#" className="navbar__link" onClick={() => setMobileMenuOpen(false)}>Areas of Focus</a>
            <a href="#" className="navbar__link" onClick={() => setMobileMenuOpen(false)}>Get Involved</a>
            <a href="#" className="navbar__link" onClick={() => setMobileMenuOpen(false)}>Meet the Team</a>
            <div className="navbar__mobile-socials">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
            <button className="navbar__contact navbar__contact--mobile">Contact us <span className="arrow">→</span></button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 