import CardTemplate from "../CardTemplate";
import { useEffect, useState } from 'react';

export default function Favorites() {

    const cardData = {
        name: 'Default',
        config: {
            background: {
                type: 'gradient',
                colors: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
            },
            text: {
                font: 'Arial',
                size: '24px',
                colorType: {
                    type: 'gradient',
                    color: '#f2ff00, #0015ff',
                },
            },
        },
    };

    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
      // Obtener los datos de localStorage y convertirlos de nuevo a un array
      const storedFavoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || [];
      setFavoriteCards(storedFavoriteCards);
      console.log(storedFavoriteCards)
    }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {
        favoriteCards.map((card, index) => (
          <div className="scale-75">
            <CardTemplate key={index} cardData={cardData}  text={card.text} />
          </div>
        ))
      }
      </div>
    </div>
  );
}
