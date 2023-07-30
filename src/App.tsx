import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatListView from './views/CatListView';
import CatBreedView from './views/CatBreedView';
import FavouritesView from './views/FavouritesView';
import { Breed, CatImage } from './models/CatInterfaces';
import './App.css';
import SingleCatView from './views/SingleCatView';
import axios from 'axios';
import SingleBreedView from './views/SingleBreedView';

const App: React.FC = () => {
  const [favourites, setFavourites] = useState<CatImage[]>([]);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [page, setPage] = useState(1);
  const [catBreeds, setCatBreeds] = useState<Breed[]>([]);


  axios.defaults.headers['X-API-KEY'] = 'live_pSUCzqZza9TKERHz6X5L7VM9eFdJ7nLaPacWuc6VId4zalMuG1SZccnbb4lAajUs';

  const fetchCatImages = useCallback(() => {
    axios
      .get<CatImage[]>(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`)
      .then((response) => {
        setCatImages((prevImages) => [...prevImages, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching cat images:', error);
      });

    axios
      .get<Breed[]>('https://api.thecatapi.com/v1/breeds')
      .then((response) => {
        setCatBreeds(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cat breeds:', error);
      });
  }, [page]);

  useEffect(() => {
    fetchCatImages();
  }, [fetchCatImages]);

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const addToFavourites = (catImage: CatImage) => {
    setFavourites((prevFavourites) => [...prevFavourites, catImage]);
  };

  const removeFromFavourites = (catImage: CatImage) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.id !== catImage.id)
    );
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Random Cats</Link>
            </li>
            <li>
              <Link to="/breeds">Cat Breeds</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/breeds" element={
            <CatBreedView catBreeds={catBreeds}/>} 
          />
          <Route path="/favourites" element={
            <FavouritesView 
              favourites={favourites}
              removeFavourite={removeFromFavourites}/>} 
          />
          <Route path="/" element={
            <CatListView 
              catImages={catImages}
              favourites={favourites} 
              addFavourite={addToFavourites} 
              removeFavourite={removeFromFavourites}
              handleLoadMoreClick={handleLoadMoreClick}/>} 
          />
          <Route path="/cat/:catId" element={
            <SingleCatView 
              favourites={favourites} 
              addFavourite={addToFavourites} 
              removeFavourite={removeFromFavourites}/>} 
          />
          <Route path="/breed/:breedId" element={
            <SingleBreedView />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
