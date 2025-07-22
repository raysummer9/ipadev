import React, { useState, useEffect } from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import BoardOfTrustees from './BoardOfTrustees';
import apiService from '../services/api';
import './TeamPage.css';

const TeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('Fetching team data...');
        const data = await apiService.getTeam();
        console.log('Team data received:', data);
        setTeamData(data);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <div className="loading">Loading team information...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <AreasOfFocusHero 
        title="Meet Our Team"
        desc="Our dedicated team of professionals and board members work together to drive inclusive development and create positive change across Nigeria's most marginalized communities."
        image="/img/card-img5.webp"
      />
      
      <BoardOfTrustees boardMembers={teamData?.board_members} />
      
      {teamData?.executive_director && (
        <section className="executive-director">
          <div className="executive-director__content">
            <div className="executive-director__photo-section">
              <div className="executive-director__photo-container">
                <img 
                  src={teamData.executive_director.photo} 
                  alt={teamData.executive_director.name}
                  className="executive-director__photo"
                  onError={(e) => {
                    e.target.src = '/img/placeholder-avatar.svg';
                  }}
                />
              </div>
            </div>
            <div className="executive-director__info">
              <h2 className="executive-director__title">{teamData.executive_director.title}</h2>
              <h3 className="executive-director__name">{teamData.executive_director.name}</h3>
              <div className="executive-director__bio">
                <p>{teamData.executive_director.bio}</p>
              </div>
              <div className="executive-director__vision">
                <h4 className="executive-director__vision-title">Vision for the Organization</h4>
                <p>"{teamData.executive_director.vision}"</p>
              </div>
              <div className="executive-director__message">
                <h4 className="executive-director__message-title">Message to Visitors</h4>
                <p>"{teamData.executive_director.message}"</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TeamPage; 