import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import useInput from '../../hooks/useInput';
import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/savedMovies';

function SavedMovies() {
   const movie = useInput();
   const [isMovieFavoriteSearchValid, setIsMovieFavoriteSearchValid] =
      useState(false);

   function handleSubmit(evt) {
      evt.preventDefault();
      setIsMovieFavoriteSearchValid(true);
      // будет код
   }

   return (
      <main className="savedMovies">
         {/*хэдер для теста */}
         {/*<Header isLoggedIn={true} />*/}
         <SearchForm
            id="inputSearchFavoriteMovie"
            onChange={movie.handleChange}
            value={movie.value || ''}
            inputName="searchFavoriteMovie"
            isDirty={isMovieFavoriteSearchValid}
            errorMessage="Нужно ввести ключевое слово"
            name="searchFavoriteMovie"
            onSubmit={handleSubmit}
         />
         <MoviesCardList movies={savedMovies} cardType="savedMovie" />
         {/*<Footer />*/}
      </main>
   );
}

export default SavedMovies;
