import React, { useState, useEffect } from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import BoardOfTrustees from './BoardOfTrustees';
import apiService from '../services/api';
import './TeamPage.css';

const TeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);
  const [wpMembers, setWpMembers] = useState([]);
  const [wpExecutiveDirector, setWpExecutiveDirector] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('Fetching team data from API...');
        const data = await apiService.getTeam();
        console.log('Team data received:', data);
        setTeamData(data);
      } catch (err) {
        console.error('Error fetching team data:', err);
        // Don't set error, just log it - we'll use fallback data
        setError(null); // Clear any previous errors
      }
    };

    const fetchWordPressMembers = async () => {
      try {
        console.log('Fetching WordPress executive director and board members...');
        
        // First, let's check if the post types exist
        const postTypesResponse = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/types');
        const postTypes = await postTypesResponse.json();
        console.log('Available post types:', postTypes);
        
        // Fetch executive director
        const executiveResponse = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/executive_director?_embed&acf=1');
        console.log('Executive response status:', executiveResponse.status);
        
        // Fetch board members
        const boardResponse = await fetch('https://admin.ipadev.ng/wp-json/wp/v2/board_members?_embed&acf=1');
        console.log('Board response status:', boardResponse.status);
        
        if (!executiveResponse.ok) {
          throw new Error(`Executive HTTP error! status: ${executiveResponse.status}`);
        }
        
        const executiveData = await executiveResponse.json();
        console.log('Executive directors received:', executiveData);
        
        // Handle board members - if board_members post type doesn't exist, use empty array
        let boardData = [];
        if (boardResponse.ok) {
          boardData = await boardResponse.json();
          console.log('Board members received:', boardData);
        } else {
          console.log('Board members post type not found, using empty array');
        }
        
        // Try to fetch ACF fields separately for executive director
        const executiveWithACF = executiveData.length > 0 ? await (async () => {
          try {
            const acfResponse = await fetch(`https://admin.ipadev.ng/wp-json/wp/v2/executive_director/${executiveData[0].id}?acf=1`);
            if (acfResponse.ok) {
              const acfData = await acfResponse.json();
              console.log(`ACF data for executive director ${executiveData[0].id}:`, acfData.acf);
              console.log(`Meta data for executive director ${executiveData[0].id}:`, acfData.meta);
              console.log(`All fields for executive director ${executiveData[0].id}:`, Object.keys(acfData));
              
              // Check if ACF fields are in meta data
              const acfFields = acfData.meta || acfData.acf || [];
              console.log(`ACF fields found for executive director ${executiveData[0].id}:`, acfFields);
              
              // Try to fetch featured image if _embedded doesn't have it
              let featuredImage = null;
              if (acfData._embedded && acfData._embedded['wp:featuredmedia'] && acfData._embedded['wp:featuredmedia'][0]) {
                featuredImage = acfData._embedded['wp:featuredmedia'][0];
              } else if (acfData.featured_media) {
                // Try to get the image URL from the original response
                const originalResponse = await fetch(`https://admin.ipadev.ng/wp-json/wp/v2/executive_director/${executiveData[0].id}?_embed`);
                if (originalResponse.ok) {
                  const originalData = await originalResponse.json();
                  if (originalData._embedded && originalData._embedded['wp:featuredmedia'] && originalData._embedded['wp:featuredmedia'][0]) {
                    featuredImage = originalData._embedded['wp:featuredmedia'][0];
                    console.log(`Got image from _embed:`, featuredImage);
                  }
                }
                
                // If still no image, use a fallback URL
                if (!featuredImage) {
                  const imageUrl = `https://admin.ipadev.ng/wp-content/uploads/2025/07/margaret-fagboyo.jpg`;
                  featuredImage = {
                    source_url: imageUrl,
                    alt_text: acfData.title?.rendered || 'Executive Director'
                  };
                  console.log(`Using fallback image URL:`, imageUrl);
                }
              }
              
              return {
                ...acfData,
                featuredImage
              };
            }
          } catch (acfErr) {
            console.error(`Error fetching ACF data for executive director ${executiveData[0].id}:`, acfErr);
          }
          return executiveData[0];
        })() : null;
        
        setWpExecutiveDirector(executiveWithACF);
        setWpMembers(boardData);
        
      } catch (err) {
        console.error('Error fetching WordPress data:', err);
        setWpMembers([]);
        setWpExecutiveDirector(null);
      } finally {
        setIsDataReady(true);
      }
    };

    fetchTeamData();
    fetchWordPressMembers();
  }, []);

  return (
    <>
      <AreasOfFocusHero
        title="Our Team"
        desc="Meet the passionate and experienced individuals who drive IPADEV's mission forward. Our team is dedicated to promoting inclusive development, social justice, and community empowerment across Nigeria."
        image="/img/card-img5.webp"
      />
      
      {/* Loading State */}
      {!isDataReady && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading team information...</p>
        </div>
      )}
      
      {error && <div className="error">Error: {error}</div>}
      
      {/* Show content only when data is ready */}
      {isDataReady && (
        <>
          {/* Always render BoardOfTrustees with fallback data */}
          <BoardOfTrustees boardMembers={
            (() => {
              const boardMembers = wpMembers && wpMembers.length > 0 
                ? wpMembers.reverse().map(member => {
                    const name = typeof member.title === 'object' && member.title.rendered 
                      ? member.title.rendered 
                      : member.title;
                    
                    // Use the content/description as the role (blue subheading)
                    const role = member.content && member.content.rendered 
                      ? member.content.rendered.replace(/<[^>]*>/g, '') // Remove HTML tags
                      : 'Board Member';
                    
                    // Use ACF role field as description (or empty if not available)
                    const description = member.acf && member.acf.role 
                      ? (typeof member.acf.role === 'object' && member.acf.role.rendered 
                          ? member.acf.role.rendered 
                          : member.acf.role)
                      : '';
                    
                    // Enhanced image handling with fallback URLs
                    let photo = '/img/placeholder-avatar.svg';
                    if (member._embedded && member._embedded['wp:featuredmedia'] && member._embedded['wp:featuredmedia'][0]) {
                      photo = member._embedded['wp:featuredmedia'][0].source_url;
                    } else if (member.featured_media) {
                      // Try to construct image URL based on common patterns
                      const imageId = member.featured_media;
                      photo = `https://admin.ipadev.ng/wp-content/uploads/2025/07/image-${imageId}.jpg`;
                    }
                    
                    // Special handling for Dr Adesina Fagbenro-Byron
                    if (name.toLowerCase().includes('adesina') || name.toLowerCase().includes('fagbenro')) {
                      photo = '/img/dr-adesina.jpeg';
                    }
                    
                    console.log(`Board member data:`, { name, role, description, photo, member });
                    
                    return { name, role, description, photo };
                  })
                : [];
              
              console.log('Board members being passed to component:', boardMembers);
              return boardMembers;
            })()
          } />
          
          {/* Executive Director Section */}
          {(() => {
            const hasWpExecutiveDirector = wpExecutiveDirector !== null && wpExecutiveDirector !== undefined;

            // Use WordPress executive director if found, otherwise fallback
            let finalExecutiveDirector;
            if (hasWpExecutiveDirector) {
              finalExecutiveDirector = {
                name: wpExecutiveDirector.title?.rendered || 'Executive Director',
                title: wpExecutiveDirector.acf?.role || 'Executive Director',
                bio: wpExecutiveDirector.acf?.bio || wpExecutiveDirector.content?.rendered?.replace(/<[^>]*>/g, '') || '',
                vision: wpExecutiveDirector.acf?.vision || '',
                message: wpExecutiveDirector.acf?.message || '',
                photo: wpExecutiveDirector.featuredImage?.source_url || '/img/margaret-fagboyo.jpg',
              };
            } else {
              finalExecutiveDirector = teamData?.executive_director || {
                name: "Dr. Margaret Fagboyo",
                title: "Executive Director",
                bio: "With 24 years of experience in international development and multilateral partnerships, Dr Fagboyo is a seasoned development practitioner. She spent 18 years with the UK's Department for International Development (DFID, now FCDO), rising to the role of Acting Regional Coordinator for South West/South South Nigeria. From 2019 to 2022, she served as Special Adviser to the Ekiti State Governor on Development Partnerships and the SDGs, contributing to strategic policy execution at the state executive level. Dr Fagboyo holds a Master's degree in Public Administration and International Affairs from the University of Lagos and a Bachelor's degree in Education from the University of Ado Ekiti. In recognition of her contributions to public service, she was awarded an Honorary Doctorate in Public Administration (Honoris Causa) by Charisma University, Turks and Caicos Islands, a British Overseas Territory, in July 2021.",
                photo: "/img/margaret-fagboyo.jpg",
                vision: "A just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.",
                message: "Welcome to IPADEV. We are committed to building bridges between communities, policymakers, and development practitioners to create sustainable change. Your support, whether through partnership, volunteering, or advocacy, helps us amplify the voices of those who need to be heard most. Together, we can build a more inclusive and equitable Nigeria."
              };
            }

            return (
              <section className="executive-director">
                <div className="executive-director__content">
                  <div className="executive-director__photo-section">
                    <div className="executive-director__photo-container">
                      <img 
                        src={finalExecutiveDirector.photo} 
                        alt={finalExecutiveDirector.name}
                        className="executive-director__photo"
                      />
                    </div>
                  </div>
                  <div className="executive-director__info">
                    <h2 className="executive-director__title">{finalExecutiveDirector.title}</h2>
                    <h1 className="executive-director__name">{finalExecutiveDirector.name}</h1>
                    <div className="executive-director__bio">
                      <p>{finalExecutiveDirector.bio}</p>
                      {finalExecutiveDirector.vision && (
                        <div className="executive-director__vision">
                          <h3 className="executive-director__vision-title">Vision</h3>
                          <p>{finalExecutiveDirector.vision}</p>
                        </div>
                      )}
                      {finalExecutiveDirector.message && (
                        <div className="executive-director__message">
                          <h3 className="executive-director__message-title">Message</h3>
                          <p>{finalExecutiveDirector.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}
        </>
      )}
    </>
  );
};

export default TeamPage; 