import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './ContactInfoPanel.css';

const ContactInfoPanel = () => (
  <div className="contact-info-panel">
    <div className="contact-info-panel__card">
      <FaEnvelope className="contact-info-panel__icon" />
      <span>contact@ipadev.org</span>
    </div>
    <div className="contact-info-panel__card">
      <FaPhone className="contact-info-panel__icon" />
      <span>+234 0000 000</span>
    </div>
    <div className="contact-info-panel__card">
      <FaMapMarkerAlt className="contact-info-panel__icon" />
      <span>Abuja Office Address<br />Flat 2B1E Admiralty Estate, Asokoro, Abuja</span>
    </div>
    <div className="contact-info-panel__card contact-info-panel__card--socials">
      <div className="contact-info-panel__socials">
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
      </div>
      <span>Social Profiles</span>
    </div>
  </div>
);

export default ContactInfoPanel; 