import React from 'react';
import { FaHandshake, FaUsers, FaHandHoldingHeart, FaBullhorn, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import './GetInvolvedPage.css';

const GetInvolvedPage = () => {
  const involvementOptions = [
    {
      icon: <FaHandshake />,
      title: "Partnership",
      description: "Collaborate with us on projects and initiatives that align with your organization's mission and values.",
      details: [
        "Strategic partnerships for sustainable development",
        "Resource sharing and capacity building",
        "Joint advocacy and policy initiatives",
        "Cross-sector collaboration opportunities"
      ]
    },
    {
      icon: <FaUsers />,
      title: "Volunteering",
      description: "Join our volunteer network and contribute your time, skills, and expertise to support our community programs.",
      details: [
        "Community outreach and engagement",
        "Program implementation and monitoring",
        "Administrative and technical support",
        "Event coordination and logistics"
      ]
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Donations",
      description: "Support our work through financial contributions that directly impact communities and drive positive change.",
      details: [
        "General program support",
        "Specific project funding",
        "Emergency response assistance",
        "Capacity building initiatives"
      ]
    },
    {
      icon: <FaBullhorn />,
      title: "Advocacy",
      description: "Amplify our voice and help raise awareness about critical issues affecting marginalized communities.",
      details: [
        "Social media advocacy campaigns",
        "Community awareness programs",
        "Policy engagement and lobbying",
        "Public speaking and presentations"
      ]
    },
    {
      icon: <FaGraduationCap />,
      title: "Training & Capacity Building",
      description: "Participate in or support our training programs designed to empower communities and build sustainable skills.",
      details: [
        "Skills development workshops",
        "Leadership training programs",
        "Technical capacity building",
        "Knowledge sharing sessions"
      ]
    },
    {
      icon: <FaHandsHelping />,
      title: "Community Engagement",
      description: "Get involved in our community-based initiatives and help create lasting positive impact at the grassroots level.",
      details: [
        "Community needs assessment",
        "Local project implementation",
        "Community mobilization",
        "Grassroots advocacy"
      ]
    }
  ];

  return (
    <div className="get-involved-page">
      <div className="get-involved-hero">
        <div className="get-involved-hero__content">
          <h1 className="get-involved-hero__title">Get Involved</h1>
          <p className="get-involved-hero__subtitle">
            Join us in creating positive change and building inclusive communities across Nigeria
          </p>
          <p className="get-involved-hero__description">
            There are many ways you can contribute to our mission of promoting equal opportunities, 
            social justice, and community empowerment. Whether you're an individual, organization, 
            or institution, your involvement can make a significant difference.
          </p>
        </div>
      </div>

      <div className="get-involved-content">
        <div className="get-involved-grid">
          {involvementOptions.map((option, index) => (
            <div key={index} className="get-involved-card">
              <div className="get-involved-card__icon">
                {option.icon}
              </div>
              <h3 className="get-involved-card__title">{option.title}</h3>
              <p className="get-involved-card__description">{option.description}</p>
              <div className="get-involved-card__details">
                <h4>How you can help:</h4>
                <ul>
                  {option.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="get-involved-cta">
          <h2>Ready to Make a Difference?</h2>
          <p>
            Contact us to learn more about how you can get involved and start making 
            a positive impact in communities across Nigeria.
          </p>
          <div className="get-involved-cta__buttons">
            <a href="/contact" className="get-involved-cta__button get-involved-cta__button--primary">
              Contact Us
            </a>
            <a href="/team" className="get-involved-cta__button get-involved-cta__button--secondary">
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolvedPage; 