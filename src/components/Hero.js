import React from 'react';
import './Hero.css';
import HeroCard from './HeroCard';

const Hero = () => (
  <section className="hero">
    <div className="hero__content">
      <h1 className="hero__heading">
        Creating Inclusive Pathways for a Just and Equitable Nigeria
      </h1>
      <p className="hero__subtext">
        Empowering marginalized communities through inclusive policies, advocacy, and community-led development.
      </p>
    </div>
    <div className="hero__visual-row hero__visual-row--trio hero__visual-row--hide-mobile">
      <HeroCard image={process.env.PUBLIC_URL + '/img/card-img1.webp'} alt="Side Card 1" className="hero-card--side-small hero-card--side-left" />
      <HeroCard image={process.env.PUBLIC_URL + '/img/card-img4.webp'} alt="Main Hero" className="hero-card--large hero-card--centerpiece" />
      <HeroCard image={process.env.PUBLIC_URL + '/img/card-img2.webp'} alt="Side Card 2" className="hero-card--side-small hero-card--side-right" />
    </div>
    <div className="hero__visual-row hero__visual-row--mobile-main-only">
      <HeroCard image={process.env.PUBLIC_URL + '/img/card-img4.webp'} alt="Main Hero" className="hero-card--large hero-card--centerpiece" />
    </div>
  </section>
);

export default Hero; 