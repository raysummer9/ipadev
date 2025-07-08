import React from 'react';
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__main">
      <div className="footer__logo-block">
        <img src={process.env.PUBLIC_URL + '/IPADEV-logo.png'} alt="IPADEV Logo" className="footer__logo" />
        <div className="footer__org-name">Inclusive Pathway Development Initiative (IPADEV)</div>
      </div>
      <nav className="footer__menu">
        <Link to="/" className="footer__menu-link">Home</Link>
        <Link to="/areas-of-focus" className="footer__menu-link">Areas of Focus</Link>
        <Link to="/get-involved" className="footer__menu-link">Get Involved</Link>
        <a href="#" className="footer__menu-link">Meet the Team</a>
        <Link to="/contact" className="footer__menu-link">Contact</Link>
      </nav>
    </div>
    <div className="footer__bottom">
      <div className="footer__socials">
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="YouTube"><FaYoutube /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} IPADEV. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 