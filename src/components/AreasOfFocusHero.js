import React from 'react';
import './AreasOfFocusHero.css';

const AreasOfFocusHero = ({ title = 'Areas of Focus', desc = '(Brief description)', image }) => (
  <section className="areas-hero-section">
    <img src={process.env.PUBLIC_URL + (image || '/img/card-img6.webp')} alt={title} className="areas-hero__bg" />
    <div className="areas-hero__overlay">
      <div className="areas-hero__overlay-content">
        <h1 className="areas-hero__title">{title}</h1>
        <p className="areas-hero__desc">{desc}</p>
      </div>
    </div>
  </section>
);

export default AreasOfFocusHero; 