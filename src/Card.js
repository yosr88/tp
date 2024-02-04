import React from 'react';

const Card = ({ card, onClick }) => {
  let cardContent;
  if (card.isFlipped) {
    cardContent = <img src={card.image} alt="Card" />;
  } else {
    cardContent = <div className="card-back"></div>; 
  }

  return (
    <div className="card" onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card;
