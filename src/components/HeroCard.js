import React from 'react';
import './HeroCard.css';

const HeroCard = ({ image = 'https://via.placeholder.com/300x200', alt = '', children, className = '' }) => (
  <div className={`hero-card ${className}`}>
    <img src={image} alt={alt} className="hero-card__img" />
    {children && <div className="hero-card__overlay">{children}</div>}
  </div>
);

export default HeroCard; 