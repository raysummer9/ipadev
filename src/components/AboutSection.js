import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = ({ onDataReady }) => {
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [coreValuesData, setCoreValuesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mission & vision data
        console.log('Fetching mission & vision data from WordPress...');
        
        // Add timeout to prevent hanging
        const controller1 = new AbortController();
        const timeoutId1 = setTimeout(() => controller1.abort(), 3000); // 3 second timeout
        
        const missionResponse = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/our_mission___vision', {
          signal: controller1.signal
        });
        
        clearTimeout(timeoutId1);
        console.log('Mission & Vision response status:', missionResponse.status);
        
        if (missionResponse.ok) {
          const missionData = await missionResponse.json();
          console.log('Mission & Vision data received:', missionData);
          
          if (missionData.length > 0) {
            const missionVision = missionData[0]; // Get the first post
            setMissionVisionData({
              title: missionVision.title?.rendered || 'Our Mission & Vision',
              content: missionVision.content?.rendered || 'Our mission is to promote equal opportunities, social justice, and community empowerment through inclusive policies, capacity building, and advocacy for societal transformation.<br /><br />Our vision is a just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.'
            });
          }
        } else {
          console.log('Mission & Vision post type not found, using default data');
        }

        // Fetch core values data from core_values custom post type
        console.log('Fetching core values data from WordPress...');
        
        // Add timeout to prevent hanging
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 3000); // 3 second timeout
        
        const coreValuesResponse = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/core_values', {
          signal: controller2.signal
        });
        
        clearTimeout(timeoutId2);
        console.log('Core Values response status:', coreValuesResponse.status);
        
        if (coreValuesResponse.ok) {
          const coreValuesData = await coreValuesResponse.json();
          console.log('Core Values data received:', coreValuesData);
          
          if (coreValuesData.length > 0) {
            const coreValues = coreValuesData[0];
            setCoreValuesData({
              title: coreValues.title?.rendered || 'Core Values'
            });
          }
        } else {
          console.log('Core Values post type not found, using default data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // Continue with default data even if API fails
      } finally {
        // Notify parent component that data is ready
        if (onDataReady) {
          onDataReady();
        }
      }
    };

    fetchData();
  }, [onDataReady]);

  // Default values
  const missionTitle = missionVisionData?.title || 'Our Mission & Vision';
  const missionContent = missionVisionData?.content || 'Our mission is to promote equal opportunities, social justice, and community empowerment through inclusive policies, capacity building, and advocacy for societal transformation.<br /><br />Our vision is a just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.';
  
  const coreValuesTitle = coreValuesData?.title || 'Core Values';

  return (
    <section className="about-section">
      <h2 className="about-section__title">GET TO KNOW US</h2>
      <div className="about-section__block about-section__block--mission">
        <div className="about-section__text">
          <div className="about-section__accent"></div>
          <span className="about-section__label">About us</span>
          <h3 className="about-section__heading">{missionTitle}</h3>
          <div 
            className="about-section__desc"
            dangerouslySetInnerHTML={{ __html: missionContent }}
          />
          <Link to="/areas-of-focus" className="about-section__btn">Learn More</Link>
        </div>
        <div className="about-section__img-wrap">
          <img src={process.env.PUBLIC_URL + '/img/img5.webp'} alt="Mission" className="about-section__img" />
        </div>
      </div>
      {/* Core Values Section (new layout) */}
      <div className="about-section__block about-section__block--vision-sample">
        <div className="about-section__img-grid-collage about-section__img-grid-collage--vision">
          <img src={process.env.PUBLIC_URL + '/img/img3.webp'} alt="Core 1" className="about-section__img about-section__img--grid-main" />
          <img src={process.env.PUBLIC_URL + '/img/img1.webp'} alt="Core 2" className="about-section__img about-section__img--grid-top" />
          <img src={process.env.PUBLIC_URL + '/img/img2.webp'} alt="Core 3" className="about-section__img about-section__img--grid-bottom" />
        </div>
        <div className="about-section__vision-content">
          <div className="about-section__accent about-section__accent--yellow"></div>
          <span className="about-section__label">About us</span>
          <h3 className="about-section__vision-title">{coreValuesTitle}</h3>
          <ul className="about-section__core-list">
            <li><strong>Inclusivity:</strong> Embracing diversity and promoting equal opportunities for all, regardless of gender, background, or status.</li>
            <li><strong>Integrity:</strong> Upholding ethical standards, transparency, and accountability in all actions and decisions.</li>
            <li><strong>Empowerment:</strong> Promoting capacity building, self-reliance, and agency among marginalized communities.</li>
            <li><strong>Social Justice:</strong> Committing to address systemic inequalities, discrimination, and injustices.</li>
            <li><strong>Collaboration:</strong> Building partnerships and alliances to amplify impact and promote collective progress.</li>
            <li><strong>Accountability:</strong> Holding ourselves and others accountable for actions and outcomes.</li>
            <li><strong>Respect:</strong> Valuing diverse perspectives, experiences, and voices.</li>
          </ul>
          <Link to="/areas-of-focus" className="about-section__vision-btn">Learn More</Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 