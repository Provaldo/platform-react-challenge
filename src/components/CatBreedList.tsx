import React from 'react';
import { Breed } from '../models/CatInterfaces';
import { Link } from 'react-router-dom';

interface CatBreedListProps {
  catBreeds: Breed[];
  onCatBreedClick: (breedId: string) => void;
}

const CatBreedList: React.FC<CatBreedListProps> = ({ catBreeds, onCatBreedClick }) => {
  return (
    <div className="cat-breed-grid">
      {catBreeds.map((breed) => (
        <Link className="cat-breed-link" key={breed.id} to={`/breed/${breed.id}`}>
          {breed.name}
        </Link>
      ))}
    </div>
  );
};

export default CatBreedList;
