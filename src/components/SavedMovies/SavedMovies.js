import SearchForm from '../SearchForm/SearchForm';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { INPUT_MOVIE_SEARCH_REGEX } from '../../utils/regex';
import {
   EMPTY_MOVIES_SEARCH_INPUT,
   INPUT_MOVIE_SEARCH_ERROR,
} from '../../utils/errorMessages';
import useLocalStorage from '../../hooks/useLocalStorage';

function SavedMovies({
   setIsMovieSearchInvalid,
   isMovieSearchInvalid,
   requestMoviesErrorMessage,
   savedFavoriteMovies,
   onMovieDelete,
   onSubmit,
   filteredFavoriteMovies,
   isFiltered,
}) {
   const movie = useInput();
   const [isFormValid, setIsFormValid] = useState(false);
   const [checkedCheckBox, setCheckedCheckBox] = useLocalStorage(
      'savedMoviesChecked',
      false
   );

   function handleSubmit(evt) {
      evt.preventDefault();
      onSubmit(movie.value, checkedCheckBox);
   }

   function handleChange(evt) {
      movie.handleChange(
         evt,
         INPUT_MOVIE_SEARCH_REGEX,
         INPUT_MOVIE_SEARCH_ERROR
      );
      if (!evt.target.value) {
         setIsMovieSearchInvalid(true);
      } else {
         setIsMovieSearchInvalid(false);
      }
   }

   useEffect(() => {
      if (movie.inputValid) {
         setIsFormValid(true);
      } else {
         setIsFormValid(false);
      }
   }, [movie.inputValid]);

   return (
      <main className="savedMovies">
         <SearchForm
            id="inputSearchFavoriteMovie"
            onChange={(evt) => handleChange(evt)}
            onBlur={() => movie.onBlur(EMPTY_MOVIES_SEARCH_INPUT, movie.value)}
            value={movie.value || ''}
            inputName="searchFavoriteMovie"
            isMovieSearchInvalid={isMovieSearchInvalid}
            setIsMovieSearchInvalid={setIsMovieSearchInvalid}
            errorMessage={movie.inputError || requestMoviesErrorMessage}
            name="searchFavoriteMovie"
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            checkedCheckBox={checkedCheckBox}
            setCheckedCheckBox={setCheckedCheckBox}
         />
         <MoviesCardList
            movies={isFiltered ? filteredFavoriteMovies : savedFavoriteMovies}
            cardType="savedMovie"
            onMovieDelete={onMovieDelete}
            isChecked={checkedCheckBox}
            savedFavoriteMovies={savedFavoriteMovies}
         />
      </main>
   );
}

export default SavedMovies;
