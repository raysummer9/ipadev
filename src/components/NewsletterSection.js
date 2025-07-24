import React, { useState } from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-section__content">
        <h2 className="newsletter-section__title">Stay Updated</h2>
        <p className="newsletter-section__description">
          Subscribe to our newsletter to receive updates on our latest initiatives, 
          community impact stories, and opportunities to get involved.
        </p>
        <form className="newsletter-section__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-section__input"
            required
          />
          <button type="submit" className="newsletter-section__button">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 