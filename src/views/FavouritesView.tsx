import React from 'react';
import { CatImage } from '../models/CatInterfaces';

interface FavouritesViewProps {
  favourites: CatImage[];
  removeFavourite: (catImage: CatImage) => void;
}

const FavouritesView: React.FC<FavouritesViewProps> = ({favourites, removeFavourite}) => {
  return (
    <div className="cat-grid-container">
      <h1>Favourite Cats</h1>
      <div className="cat-grid">
        {favourites.map((favCat) => (
          <div key={favCat.id} className='cat-grid-cell'>
            <img src={favCat.url} alt={`Favourite Cat ${favCat.id}`} className='cat-grid-img-btn'/>
            <button onClick={() => removeFavourite(favCat)}>
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesView;
