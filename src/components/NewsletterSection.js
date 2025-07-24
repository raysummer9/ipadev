import React, { useState } from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setServerResponse(null);
      return;
    }
    setError('');
    setLoading(true);
    setServerResponse(null);
    try {
      const formData = new FormData();
      formData.append('name', 'Newsletter Signup');
      formData.append('email', email);
      formData.append('phone', '');
      formData.append('message', 'Please add this email to the newsletter list.');
      const res = await fetch('/sendmail.php', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setServerResponse({ type: 'success', message: data.message });
        setSubmitted(true);
        setEmail('');
      } else {
        setServerResponse({ type: 'error', message: data.message || 'Failed to subscribe.' });
      }
    } catch (err) {
      setServerResponse({ type: 'error', message: 'Failed to subscribe. Please try again later.' });
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }
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
              disabled={loading}
            />
            <button type="submit" className="newsletter-section__button" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && <div className="newsletter-section__error">{error}</div>}
          {serverResponse && (
            <div className={`newsletter-section__${serverResponse.type}`}>{serverResponse.message}</div>
          )}
          <div className="newsletter-section__privacy">
            We care about your data in our <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 