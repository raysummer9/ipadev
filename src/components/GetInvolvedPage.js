import React from 'react';
import { FaHandshake, FaUsers, FaHandHoldingHeart, FaBullhorn, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import './GetInvolvedPage.css';

const GetInvolvedPage = () => {
  const involvementOptions = [
    {
      icon: <FaHandshake />,
      title: "Partnership",
      description: "Collaborate with us on projects and initiatives that align with your organization's mission and values."
    },
    {
      icon: <FaUsers />,
      title: "Volunteering",
      description: "Join our volunteer network and contribute your time, skills, and expertise to support our community programs."
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Donations",
      description: "Support our work through financial contributions that directly impact communities and drive positive change."
    },
    {
      icon: <FaBullhorn />,
      title: "Advocacy",
      description: "Amplify our voice and help raise awareness about critical issues affecting marginalized communities."
    },
    {
      icon: <FaGraduationCap />,
      title: "Training & Capacity Building",
      description: "Participate in or support our training programs designed to empower communities and build sustainable skills."
    },
    {
      icon: <FaHandsHelping />,
      title: "Community Engagement",
      description: "Get involved in our community-based initiatives and help create lasting positive impact at the grassroots level."
    }
  ];

  return (
    <div className="get-involved__section">
      <div className="get-involved__content">
        <h2 className="get-involved__heading">Get Involved</h2>
        <div className="get-involved__options">
          {involvementOptions.map((option, index) => (
            <div key={index} className="get-involved__option">
              <div className="get-involved__icon">
                {option.icon}
              </div>
              <h3 className="get-involved__option-title">{option.title}</h3>
              <p className="get-involved__option-desc">{option.description}</p>
            </div>
          ))}
        </div>
        <div className="get-involved__cta">
          <div className="get-involved__cta-content">
            <h2 className="get-involved__cta-heading">Ready to Make a Difference?</h2>
            <p className="get-involved__cta-text">
              Contact us to learn more about how you can get involved and start making 
              a positive impact in communities across Nigeria.
            </p>
            <a href="/contact" className="get-involved__cta-btn">
              Contact Us <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolvedPage; 