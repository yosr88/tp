import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { supabase } from './supabaseClient';


// Je définis le composant MemoryGame, qui est le composant principal de mon application
const MemoryGame = () => {
  // Je déclare des états locaux pour gérer les cartes, le score, les cartes ouvertes et l'activation/désactivation des cartes
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [openCards, setOpenCards] = useState([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  // J'utilise useEffect pour charger les données des cartes depuis Supabase lorsque le composant est monté
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Je fais une requête à Supabase pour récupérer toutes les cartes
        let { data, error } = await supabase
          .from('mon-app-react') 
          .select('*'); 
        
        // Je gère les erreurs potentielles lors de la requête
        if (error) throw error;

        // Je formate les données pour créer deux cartes pour chaque image (pour le jeu de paires)
        const formattedCards = data.flatMap((item) => [
          { id: `${item.id}-a`, image: item.image_url, isFlipped: false, canFlip: true },
          { id: `${item.id}-b`, image: item.image_url, isFlipped: false, canFlip: true },
        ]);

        // Je mets à jour l'état des cartes avec les données formatées et mélangées de manière aléatoire
        setCards(formattedCards.sort(() => Math.random() - 0.5));
      } catch (error) {
        // J'affiche les erreurs de chargement dans la console
        console.error("Erreur lors du chargement des cartes:", error);
      }
    };

    // J'appelle la fonction fetchCards pour exécuter la requête
    fetchCards();
  }, []);

  // Je définis la fonction flipCard pour gérer le retournement des cartes
  const flipCard = (cardToFlip) => {
    // Si toutes les cartes sont désactivées ou si deux cartes sont déjà ouvertes, je ne fais rien
    if (shouldDisableAllCards || openCards.length === 2) return;

    // Sinon, je retourne la carte sélectionnée
    const newCards = cards.map(card => {
      if (card.id === cardToFlip.id) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    // Je mets à jour l'état des cartes avec la nouvelle configuration
    setCards(newCards);

    // J'ajoute la carte retournée à l'ensemble des cartes ouvertes
    const flippedCard = newCards.find(card => card.id === cardToFlip.id);
    setOpenCards(prevOpenCards => [...prevOpenCards, flippedCard]);
  };

  // J'utilise un autre useEffect pour gérer la logique d'évaluation des cartes ouvertes
  useEffect(() => {
    // Si deux cartes sont ouvertes, je vérifie si elles sont une paire
    if (openCards.length === 2) {
      setShouldDisableAllCards(true); // Je désactive toutes les cartes pour empêcher d'autres actions
      setTimeout(() => evaluate(), 1000); // J'ajoute un délai avant d'évaluer la paire
    }
  }, [openCards]);

  // Je définis la fonction evaluate pour voir si les deux cartes ouvertes forment une paire
  const evaluate = () => {
    let match = false;
    if (openCards.length === 2) {
      const [firstCard, secondCard] = openCards;
      match = firstCard.image === secondCard.image;
      
      // Si c'est une paire, je mets à jour le score et je marque les cartes comme ne pouvant plus être retournées
      if (match) {
        setScore(score + 1);
        setCards(prevCards =>
          prevCards.map(card => {
            if (card.image === firstCard.image) {
              return { ...card, canFlip: false };
            }
            return card;
          })
        );
      } else {
        setCards(prevCards =>
          prevCards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          })
        );
      }
    }
    setTimeout(() => {
      setOpenCards([]);
      setShouldDisableAllCards(false);
    }, match ? 500 : 1000);
  };

  const onCardClicked = (card) => {
    if (!card.isFlipped && !shouldDisableAllCards && card.canFlip) {
      flipCard(card);
    }
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="game-board">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={() => onCardClicked(card)} />
      ))}
      <button onClick={resetGame}>Nouveau jeu</button>
      <p>Score: {score}</p>
    </div>
  );
};

export default MemoryGame;