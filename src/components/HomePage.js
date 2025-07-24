import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import AboutSection from './AboutSection';
import QuoteSection from './QuoteSection';
import './HomePage.css';

const HomePage = () => {
  const [isDataReady, setIsDataReady] = useState(false);
  const [heroDataReady, setHeroDataReady] = useState(false);
  const [aboutDataReady, setAboutDataReady] = useState(false);

  useEffect(() => {
    // Add a maximum loading time of 10 seconds
    const maxLoadingTimer = setTimeout(() => {
      console.log('Maximum loading time reached, showing content anyway');
      setIsDataReady(true);
    }, 10000); // 10 seconds max

    // Check if all data is ready
    if (heroDataReady && aboutDataReady) {
      clearTimeout(maxLoadingTimer);
      setIsDataReady(true);
    }

    return () => clearTimeout(maxLoadingTimer);
  }, [heroDataReady, aboutDataReady]);

  // Force ready after 3 seconds if components don't respond
  useEffect(() => {
    const forceReadyTimer = setTimeout(() => {
      if (!heroDataReady || !aboutDataReady) {
        console.log('Force ready after 3 seconds');
        setHeroDataReady(true);
        setAboutDataReady(true);
      }
    }, 3000);

    return () => clearTimeout(forceReadyTimer);
  }, []);

  return (
    <>
      {/* Loading State */}
      {!isDataReady && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading homepage content...</p>
        </div>
      )}
      
      {/* Show content only when data is ready */}
      {isDataReady && (
        <>
          <Hero onDataReady={() => setHeroDataReady(true)} />
          <AboutSection onDataReady={() => setAboutDataReady(true)} />
          <QuoteSection />
        </>
      )}
    </>
  );
};

export default HomePage; 