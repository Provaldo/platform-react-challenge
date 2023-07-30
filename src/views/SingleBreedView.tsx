import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { CatImage } from '../models/CatInterfaces';

interface SingleBreedViewProps {}

const SingleCatView: React.FC<SingleBreedViewProps> = () => {
  const { breedId } = useParams<{ breedId: string }>();
  const [breedImages, setBreedImages] = useState<CatImage[]>([]);

  const navigate = useNavigate();

  axios.defaults.headers['X-API-KEY'] = 'live_pSUCzqZza9TKERHz6X5L7VM9eFdJ7nLaPacWuc6VId4zalMuG1SZccnbb4lAajUs';


  useEffect(() => {
    axios
    .get<CatImage[]>(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`
    )
    .then((response) => {
        setBreedImages(response.data);
    })
    .catch((error) => {
        console.error('Error fetching breed images:', error);
    });
  }, [breedId]);

  return (
    <div>
    {breedId && (
      <Modal isOpen={Boolean(breedId)} onClose={() => navigate(-1)}>
        {breedImages.map((catImage) => (
          <img 
            key={catImage.id} 
            src={catImage.url} 
            alt={`Breed ${catImage.id}`} 
            onClick={() => navigate(`/cat/${catImage.id}`)}
            className='cat-breed-img'
          />
        ))}
      </Modal>
    )}
    </div>
  );
};

export default SingleCatView;
