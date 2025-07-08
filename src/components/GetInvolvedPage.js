import React from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import { FaHandsHelping, FaHandshake, FaCalendarAlt, FaHeart, FaArrowRight } from 'react-icons/fa';
import './GetInvolvedPage.css';

const involvementOptions = [
  {
    icon: <FaHandsHelping className="get-involved__icon" />,
    title: 'Volunteer with IPADEV',
    desc: 'Are you eager to make a difference on the ground? Our volunteers support advocacy efforts, organize outreach events, assist with research, and engage communities directly.'
  },
  {
    icon: <FaHandshake className="get-involved__icon" />,
    title: 'Partner with IPADEV',
    desc: 'We’re stronger together. We collaborate with NGOs, government agencies, academic institutions, and private sector allies to expand our reach and accelerate inclusive development.'
  },
  {
    icon: <FaCalendarAlt className="get-involved__icon" />,
    title: 'Attend Our Events and Workshops',
    desc: 'Be part of our on-the-ground activities. From policy forums to empowerment trainings, our events are designed to inform, inspire, and mobilize.'
  },
  {
    icon: <FaHeart className="get-involved__icon" />,
    title: 'Donate to Support Our Programs',
    desc: 'Your financial support enables us to deliver critical programs in underserved communities—promoting equity, education, and empowerment where it’s needed most.'
  }
];

const GetInvolvedPage = () => (
  <>
    <AreasOfFocusHero 
      title="Get Involved"
      desc="At IPADEV, we believe that inclusive development is a shared responsibility. Whether you're a passionate individual, organization, or donor, your support can drive real impact across Nigeria’s most marginalized communities."
      image="/img/card-img6.webp"
    />
    <section className="get-involved__section">
      <div className="get-involved__content">
        <h2 className="get-involved__heading">Here’s how you can join our movement for social justice and equality:</h2>
        <div className="get-involved__options">
          {involvementOptions.map((opt, idx) => (
            <div className="get-involved__option" key={idx}>
              {opt.icon}
              <h3 className="get-involved__option-title">{opt.title}</h3>
              <p className="get-involved__option-desc">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="get-involved__cta">
      <div className="get-involved__cta-content">
        <h2 className="get-involved__cta-heading">Ready to make a difference?</h2>
        <p className="get-involved__cta-text">Contact us today to learn how you can get involved, partner, or support our mission for inclusive development in Nigeria.</p>
        <a href="/contact" className="get-involved__cta-btn">
          Contact Us
        </a>
      </div>
    </section>
  </>
);

export default GetInvolvedPage; 