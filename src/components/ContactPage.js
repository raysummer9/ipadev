import React from 'react';
import AreasOfFocusHero from './AreasOfFocusHero';
import ContactForm from './ContactForm';
import ContactInfoPanel from './ContactInfoPanel';
import './ContactPage.css';

const ContactPage = () => (
  <>
    <AreasOfFocusHero 
      title="Contact Us" 
      desc="Have questions, feedback, or want to collaborate? Reach out to us and our team will get back to you as soon as possible." 
      image="/img/card-img6.webp" 
    />
    <section className="contact-section contact-page-bg">
      <div className="contact-section__form-col">
        <ContactForm />
      </div>
      <div className="contact-section__separator" />
      <div className="contact-section__info-col">
        <ContactInfoPanel />
      </div>
    </section>
  </>
);

export default ContactPage; 