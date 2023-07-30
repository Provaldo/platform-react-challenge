import React from 'react';

export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}

interface Breed {
  id: string;
  name: string;
}

interface CatListProps {
  catImages: CatImage[];
  onCatImageClick: (catImage: CatImage) => void;
}

const CatList: React.FC<CatListProps> = ({ catImages, onCatImageClick }) => {
  return (
    <div className="cat-grid">
      {catImages.map((catImage) => (
        <img
          className='cat-grid-img-only'
          key={catImage.id}
          src={catImage.url}
          alt={`Cat ${catImage.id}`}
          onClick={() => onCatImageClick(catImage)}
        />
      ))}
    </div>
  );
};

export default CatList;
