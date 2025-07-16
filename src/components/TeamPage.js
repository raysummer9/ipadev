import React from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import BoardOfTrustees from './BoardOfTrustees';
import './TeamPage.css';

const TeamPage = () => {
  return (
    <>
      <AreasOfFocusHero 
        title="Meet Our Team"
        desc="Our dedicated team of professionals and board members work together to drive inclusive development and create positive change across Nigeria's most marginalized communities."
        image="/img/card-img5.webp"
      />
      
      <BoardOfTrustees />
      
      <section className="executive-director">
        <div className="executive-director__content">
          <div className="executive-director__photo-section">
            <div className="executive-director__photo-container">
              <img 
                src="/img/margaret-fagboyo.jpg" 
                alt="Dr. Margaret Fagboyo"
                className="executive-director__photo"
                onError={(e) => {
                  e.target.src = '/img/margaret-fagboyo.jpg';
                }}
              />
            </div>
          </div>
          <div className="executive-director__info">
            <h2 className="executive-director__title">Executive Director</h2>
            <h3 className="executive-director__name">Dr. Margaret Fagboyo</h3>
            <div className="executive-director__bio">
              <p>
                With 24 years of experience in international development and multilateral partnerships, Dr Fagboyo is a seasoned development practitioner. She spent 18 years with the UK's Department for International Development (DFID, now FCDO), rising to the role of Acting Regional Coordinator for South West/South South Nigeria. From 2019 to 2022, she served as Special Adviser to the Ekiti State Governor on Development Partnerships and the SDGs, contributing to strategic policy execution at the state executive level.
              </p>
              <p>
                Dr Fagboyo holds a Master's degree in Public Administration and International Affairs from the University of Lagos and a Bachelor's degree in Education from the University of Ado Ekiti. In recognition of her contributions to public service, she was awarded an Honorary Doctorate in Public Administration (Honoris Causa) by Charisma University, Turks and Caicos Islands, a British Overseas Territory, in July 2021.
              </p>
            </div>
            <div className="executive-director__vision">
              <h4 className="executive-director__vision-title">Vision for the Organization</h4>
              <p>
                "A just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development."
              </p>
            </div>
            <div className="executive-director__message">
              <h4 className="executive-director__message-title">Message to Visitors</h4>
              <p>
                "Welcome to IPADEV. We are committed to building bridges between communities, policymakers, and development practitioners to create sustainable change. Your support, whether through partnership, volunteering, or advocacy, helps us amplify the voices of those who need to be heard most. Together, we can build a more inclusive and equitable Nigeria."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage; 