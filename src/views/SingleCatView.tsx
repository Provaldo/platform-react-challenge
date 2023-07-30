import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { CatImage } from '../models/CatInterfaces';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface SingleCatViewProps {
    favourites: CatImage[];
    addFavourite: (catImage: CatImage) => void;
    removeFavourite: (catImage: CatImage) => void;
}

const SingleCatView: React.FC<SingleCatViewProps> = ({ favourites, addFavourite, removeFavourite }) => {
  const { catId } = useParams<{ catId: string }>(); 
  const [catImage, setCatImage] = useState<CatImage | null>(null);

  const navigate = useNavigate();

  axios.defaults.headers['X-API-KEY'] = 'live_pSUCzqZza9TKERHz6X5L7VM9eFdJ7nLaPacWuc6VId4zalMuG1SZccnbb4lAajUs';


  useEffect(() => {
    axios
      .get<CatImage>(`https://api.thecatapi.com/v1/images/${catId}`)
      .then((response) => {
        if (response.data) {
          setCatImage(response.data);
        } else {
          setCatImage(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching cat image:', error);
      });
  }, [catId]);

  return (
    <div>
      {catImage && (
        <Modal isOpen={true} onClose={() => navigate(-1)}>
          <img src={catImage.url} alt={`Cat ${catImage.id}`} />
          {catImage.breeds && catImage.breeds.length > 0 ? (
            <p onClick={() => navigate(`/breed/${catImage.breeds[0].id}`)}>Breed: {catImage.breeds[0].name}</p>
          ) : (
            <p>No breed information available.</p>
          )}
          {favourites.some(element => element.id === catImage.id) ? (
            <FaHeart onClick={() => removeFavourite(catImage)} style={{ color: 'red' }} />
          ) : (
            <FaRegHeart onClick={() => addFavourite(catImage)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default SingleCatView;
