import React from 'react';
import './AreasOfFocusHero.css';

const AreasOfFocusHero = () => (
  <section className="areas-hero">
    <img src={process.env.PUBLIC_URL + '/img/card-img6.webp'} alt="Areas of Focus" className="areas-hero__bg" />
    <div className="areas-hero__overlay">
      <h1 className="areas-hero__title">Areas of Focus</h1>
      <p className="areas-hero__desc">Our Guiding Methods for Driving Inclusive and Sustainable Change</p>
    </div>
  </section>
);

export default AreasOfFocusHero; 