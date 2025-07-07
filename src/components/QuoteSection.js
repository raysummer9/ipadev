import React from 'react';
import './QuoteSection.css';

const QuoteSection = () => (
  <section className="quote-section">
    <h2 className="quote-section__title">QUICK WORDS</h2>
    <div className="quote-section__quote-block">
      <span className="quote-section__quote-mark">&ldquo;</span>
      <p className="quote-section__quote-text">
        IPADEV aims to drive meaningful change and create a more equitable society for all Nigerians by leveraging innovative approaches, engaging diverse stakeholders, and promoting inclusive policies.
      </p>
      <span className="quote-section__quote-mark quote-section__quote-mark--right">&rdquo;</span>
    </div>
    <div className="quote-section__author-block">
      <span className="quote-section__author">Dr. Margaret Fagboyo</span>
      <span className="quote-section__role">Executive Director</span>
    </div>
    <img src={process.env.PUBLIC_URL + '/img/hand-img.png'} alt="Hands" className="quote-section__hands" />
  </section>
);

export default QuoteSection; 