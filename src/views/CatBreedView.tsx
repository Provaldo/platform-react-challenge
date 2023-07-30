import React from 'react';
import CatBreedList from '../components/CatBreedList';
import { Breed } from '../models/CatInterfaces';
import { useNavigate } from 'react-router-dom';


interface CatBreedViewProps {
  catBreeds: Breed[];
}

const CatBreedView: React.FC<CatBreedViewProps> = ({catBreeds}) => {
  const navigate = useNavigate();

  const handleCatBreedClick = (breedId: string) => {
    navigate(`/breed/${breedId}`);
  };

  return (
    <div className="cat-breed-container">
      <h1>Cat Breeds</h1>
      <CatBreedList catBreeds={catBreeds} onCatBreedClick={handleCatBreedClick} />
    </div>
  );
};

export default CatBreedView;
