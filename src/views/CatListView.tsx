import React from 'react';
import CatList from '../components/CatList';
import { CatImage } from '../models/CatInterfaces';
import { useNavigate } from 'react-router-dom';


interface CatListViewProps {
  catImages: CatImage[];
  favourites: CatImage[];
  addFavourite: (catImage: CatImage) => void;
  removeFavourite: (catImage: CatImage) => void;
  handleLoadMoreClick: () => void;
}

const CatListView: React.FC<CatListViewProps> = ({ catImages, favourites, addFavourite, removeFavourite, handleLoadMoreClick }) => {
  const navigate = useNavigate();

  const handleCatImageClick = (catImage: CatImage) => {
    navigate(`/cat/${catImage.id}`);
  };

  return (
    <div className="cat-list-view">
      <h1>Random Cat Images</h1>
      <div className="cat-grid-container">
        <CatList catImages={catImages} onCatImageClick={handleCatImageClick} />
      </div>

      <button onClick={handleLoadMoreClick}>Load More</button>
    </div>
  );
};

export default CatListView;
