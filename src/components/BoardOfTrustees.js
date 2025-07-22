import React from 'react';
import './BoardOfTrustees.css';

const BoardOfTrustees = ({ boardMembers = [] }) => {
  // Fallback data if no board members are provided
  const defaultBoardMembers = [
    {
      name: 'Adesina Fagbenro-Byron',
      role: 'Board Member',
      photo: '/img/dr-adesina.jpeg'
    },
    {
      name: 'Abiodun Essiet',
      role: 'Board Member',
      photo: '/img/essiet.jpeg'
    },
    {
      name: 'Olamide Juliana Falana',
      role: 'Board Member',
      photo: '/img/olamide-falana.jpeg'
    },
    {
      name: 'Olubunmi Adelugba',
      role: 'Board Member',
      photo: '/img/adelugba.jpeg'
    },
    {
      name: 'Dominion Dolapo Fagboyo',
      role: 'Board Member',
      photo: '/img/dominion.jpeg'
    },
    {
      name: 'Samuel Ruth Chadi',
      role: 'Secretary',
      photo: '/img/ruth.jpeg'
    }
  ];

  const members = boardMembers.length > 0 ? boardMembers : defaultBoardMembers;

  return (
    <section className="board-trustees">
      <div className="board-trustees__content">
        <h2 className="board-trustees__heading">Board of Trustees</h2>
        <div className="board-trustees__grid">
          {members.map((member, index) => (
            <div className="board-trustees__member" key={index}>
              <div className="board-trustees__photo-container">
                <img 
                  src={member.photo} 
                  alt={member.name}
                  className="board-trustees__photo"
                  onError={(e) => {
                    e.target.src = '/img/placeholder-avatar.svg';
                  }}
                />
              </div>
              <h3 className="board-trustees__name">{member.name}</h3>
              <p className="board-trustees__role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfTrustees; 