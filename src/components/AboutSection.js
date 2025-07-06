import React from 'react';
import './AboutSection.css';

const AboutSection = () => (
  <section className="about-section">
    <h2 className="about-section__title">GET TO KNOW US</h2>
    <div className="about-section__block about-section__block--mission">
      <div className="about-section__text">
        <div className="about-section__accent"></div>
        <span className="about-section__label">About us</span>
        <h3 className="about-section__heading">Our Mission & Vision</h3>
        <p className="about-section__desc">
          Our mission is to promote equal opportunities, social justice, and community empowerment through inclusive policies, capacity building, and advocacy for societal transformation.<br /><br />
          Our vision is a just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.
 
        </p>
        <button className="about-section__btn">Learn More</button>
      </div>
      <div className="about-section__img-wrap">
        <img src={process.env.PUBLIC_URL + '/img/card-img1.webp'} alt="Mission" className="about-section__img" />
      </div>
    </div>
    {/* Core Values Section (new layout) */}
    <div className="about-section__block about-section__block--vision-sample">
      <div className="about-section__img-grid-collage about-section__img-grid-collage--vision">
        <img src={process.env.PUBLIC_URL + '/img/card-img2.webp'} alt="Core 1" className="about-section__img about-section__img--grid-main" />
        <img src={process.env.PUBLIC_URL + '/img/card-img3.webp'} alt="Core 2" className="about-section__img about-section__img--grid-top" />
        <img src={process.env.PUBLIC_URL + '/img/card-img4.webp'} alt="Core 3" className="about-section__img about-section__img--grid-bottom" />
      </div>
      <div className="about-section__vision-content">
        <div className="about-section__accent about-section__accent--yellow"></div>
        <span className="about-section__label">About us</span>
        <h3 className="about-section__vision-title">Core Values</h3>
        <ul className="about-section__core-list">
          <li><strong>Inclusivity:</strong> Embracing diversity and promoting equal opportunities for all, regardless of gender, background, or status.</li>
          <li><strong>Integrity:</strong> Upholding ethical standards, transparency, and accountability in all actions and decisions.</li>
          <li><strong>Empowerment:</strong> Promoting capacity building, self-reliance, and agency among marginalized communities.</li>
          <li><strong>Social Justice:</strong> Committing to address systemic inequalities, discrimination, and injustices.</li>
          <li><strong>Collaboration:</strong> Building partnerships and alliances to amplify impact and promote collective progress.</li>
          <li><strong>Accountability:</strong> Holding ourselves and others accountable for actions and outcomes.</li>
          <li><strong>Respect:</strong> Valuing diverse perspectives, experiences, and voices.</li>
        </ul>
        <button className="about-section__vision-btn">Learn More</button>
      </div>
    </div>
  </section>
);

export default AboutSection; 