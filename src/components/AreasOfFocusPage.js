import React from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import AreasOfFocusBackground from './AreasOfFocusBackground';
import StrategicObjectivesSection from './StrategicObjectivesSection';

const AreasOfFocusPage = () => (
  <>
    <AreasOfFocusHero 
      title="Areas of Focus"
      desc="Discover our strategic priorities and key initiatives aimed at promoting inclusive development, social justice, and community empowerment across Nigeria."
    />
    <AreasOfFocusBackground />
    <StrategicObjectivesSection />
  </>
);

export default AreasOfFocusPage; 