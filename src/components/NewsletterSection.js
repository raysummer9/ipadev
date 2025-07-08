import React, { useState } from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Here you would send the email to your backend/newsletter service
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-section__content">
        <div className="newsletter-section__left">
          <h2 className="newsletter-section__headline">Get update on success stories</h2>
          <p className="newsletter-section__subtext">Get directly on your email</p>
        </div>
        <form className="newsletter-section__form" onSubmit={handleSubmit} autoComplete="off">
          <div className="newsletter-section__input-group">
            <input
              type="email"
              className="newsletter-section__input"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" className="newsletter-section__button">
              Subscribe
            </button>
          </div>
          {error && <div className="newsletter-section__error">{error}</div>}
          {submitted && <div className="newsletter-section__success">Thank you for subscribing!</div>}
          <div className="newsletter-section__privacy">
            We care about your data in our <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 