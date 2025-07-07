import React from 'react';
import './StrategicObjectivesSection.css';

const objectives = [
  'Empower Marginalized Communities: Strengthen the capacity of marginalized groups, particularly women and girls, to advocate for their rights and participate in decision-making processes.',
  'Promote Inclusive Policies and Practices: Advocate for and support the development of inclusive policies, laws, and practices that promote gender equality, social justice, and human rights.',
  "Foster Partnerships and Collaborations: Build and maintain strategic partnerships with civil society organizations, government agencies, and other stakeholders to amplify IPADEV's impact and promote collective action.",
  
  "Enhance Organizational Capacity: Strengthen IPADEV's institutional capacity, systems, and structures to ensure effective program delivery, efficient resource management, and sustainability.",
  'Drive Social Transformation: Support initiatives that challenge harmful social norms, promote behavioural change, and foster a culture of inclusivity, equality, and social justice.'
];

const focusAreas = [
  "Gender Equality and Women's Empowerment",
  'Social Justice and Human Rights',
  'Community Empowerment'
];

const approach = [
  'Rights-based approach',
  'Capacity-building',
  'Research',
  'Advocacy and policy influencing',
  'Partnerships and collaborations',
  'Community-led'
];

const StrategicObjectivesSection = () => (
  <section className="strategic-section">
    <div className="strategic-section__col">
      <h2 className="strategic-section__heading">Strategic objectives:</h2>
      <ul className="strategic-section__list">
        {objectives.map((item, i) => (
          <li key={i}><span className="strategic-section__bullet"></span>{item}</li>
        ))}
      </ul>
    </div>
    <div className="strategic-section__col">
      <h2 className="strategic-section__heading">Areas of focus:</h2>
      <ul className="strategic-section__list">
        {focusAreas.map((item, i) => (
          <li key={i}><span className="strategic-section__bullet"></span>{item}</li>
        ))}
      </ul>
      <h2 className="strategic-section__heading" style={{marginTop: '1.2em'}}>Approach to work:</h2>
      <ul className="strategic-section__list">
        {approach.map((item, i) => (
          <li key={i}><span className="strategic-section__bullet"></span>{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default StrategicObjectivesSection; 