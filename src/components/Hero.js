import React, { useState, useEffect } from 'react';
import './Hero.css';
import HeroCard from './HeroCard';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        console.log('Fetching hero data from WordPress...');
        const response = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/hero');
        console.log('Hero response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Hero data received:', data);
          
          if (data.length > 0) {
            const hero = data[0]; // Get the first hero post
            setHeroData({
              title: hero.title?.rendered || 'Creating Inclusive Pathways for a Just and Equitable Nigeria',
              description: hero.content?.rendered?.replace(/<[^>]*>/g, '') || 'Empowering marginalized communities through inclusive policies, advocacy, and community-led development.'
            });
          }
        } else {
          console.log('Hero post type not found, using default data');
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Default values
  const title = heroData?.title || 'Creating Inclusive Pathways for a Just and Equitable Nigeria';
  const description = heroData?.description || 'Empowering marginalized communities through inclusive policies, advocacy, and community-led development.';

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__heading">
          {title}
        </h1>
        <p className="hero__subtext">
          {description}
        </p>
      </div>
      <div className="hero__visual-row hero__visual-row--trio hero__visual-row--hide-mobile">
        <HeroCard image={process.env.PUBLIC_URL + '/img/img1.webp'} alt="Side Card 1" className="hero-card--side-small hero-card--side-left" />
        <HeroCard image={process.env.PUBLIC_URL + '/img/img4.webp'} alt="Main Hero" className="hero-card--large hero-card--centerpiece" />
        <HeroCard image={process.env.PUBLIC_URL + '/img/img2.webp'} alt="Side Card 2" className="hero-card--side-small hero-card--side-right" />
      </div>
      <div className="hero__visual-row hero__visual-row--mobile-main-only">
        <HeroCard image={process.env.PUBLIC_URL + '/img/img4.webp'} alt="Main Hero" className="hero-card--large hero-card--centerpiece" />
      </div>
    </section>
  );
};

export default Hero; 