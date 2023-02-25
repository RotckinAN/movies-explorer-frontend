import SearchForm from '../SearchForm/SearchForm';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useCurrentWidth from '../../hooks/useCurrentWidth';
import { INPUT_MOVIE_SEARCH_REGEX } from '../../utils/regex';
import {
   EMPTY_MOVIES_SEARCH_INPUT,
   INPUT_MOVIE_SEARCH_ERROR,
} from '../../utils/errorMessages';
import useLocalStorage from '../../hooks/useLocalStorage';

function Movies({
   movies,
   requestMoviesErrorMessage,
   isMovieSearchInvalid,
   setIsMovieSearchInvalid,
   onSubmit,
   isAddMoviesButtonActive,
   setIsAddMoviesButtonActive,
   onMovieSave,
   onMovieDelete,
   savedFavoriteMovies,
}) {
   const [maxAllowedMovieIndex, setMaxAllowedMovieIndex] = useState(null);
   const [addMoviesIndex, setAddMoviesIndex] = useState(null);
   const [isFormValid, setIsFormValid] = useState(false);
   const [checkedCheckBox, setCheckedCheckBox] = useLocalStorage(
      'searchMoviesChecked',
      false
   );
   const addButtonClassName = `movies__addButton ${
      isAddMoviesButtonActive ? '' : 'movies__addButton_inactive'
   }`;
   const movie = useInput('');
   const actualWindowWidth = useCurrentWidth();

   function handleSubmit(evt) {
      evt.preventDefault();
      onSubmit(movie.localStorageSearchMovieValue, checkedCheckBox);
   }

   function handleChange(evt) {
      movie.handleChangeToLocalStorage(
         evt,
         INPUT_MOVIE_SEARCH_REGEX,
         INPUT_MOVIE_SEARCH_ERROR,
         movie.setLocalStorageSearchMovieValue
      );
      if (!evt.target.value) {
         setIsMovieSearchInvalid(true);
      } else {
         setIsMovieSearchInvalid(false);
      }
   }

   function addButtonOnClick() {
      setMaxAllowedMovieIndex((prev) => prev + addMoviesIndex);
   }

   function changeActualWindowWidth() {
      if (actualWindowWidth >= 1280) {
         setMaxAllowedMovieIndex((prev) => (prev < 12 ? 12 : prev));
         setAddMoviesIndex(3);
      } else if (actualWindowWidth >= 450 && actualWindowWidth < 1280) {
         setMaxAllowedMovieIndex((prev) => (prev < 8 ? 8 : prev));
         setAddMoviesIndex(2);
      } else if (actualWindowWidth < 450) {
         setMaxAllowedMovieIndex((prev) => (prev < 5 ? 5 : prev));
         setAddMoviesIndex(2);
      }
   }

   useEffect(() => {
      if (
         checkedCheckBox
            ? maxAllowedMovieIndex >=
              movies.filter((movie) => movie['duration'] <= 40).length
            : maxAllowedMovieIndex >= movies.length
      ) {
         setIsAddMoviesButtonActive(false);
      } else {
         setIsAddMoviesButtonActive(true);
      }
   }, [
      maxAllowedMovieIndex,
      checkedCheckBox,
      movies,
      setIsAddMoviesButtonActive,
   ]);

   useEffect(() => {
      changeActualWindowWidth();
   }, [actualWindowWidth]);

   useEffect(() => {
      if (movie.inputValid) {
         setIsFormValid(true);
      } else {
         setIsFormValid(false);
      }
   }, [movie.inputValid]);

   return (
      <main className="movies">
         <SearchForm
            id="inputSearchMovie"
            onChange={(evt) => handleChange(evt)}
            onBlur={() =>
               movie.onBlur(
                  EMPTY_MOVIES_SEARCH_INPUT,
                  movie.localStorageSearchMovieValue
               )
            }
            value={movie.localStorageSearchMovieValue}
            inputName="searchMovie"
            isMovieSearchInvalid={isMovieSearchInvalid}
            setIsMovieSearchInvalid={setIsMovieSearchInvalid}
            errorMessage={movie.inputError || requestMoviesErrorMessage}
            name="searchNewMovie"
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            checkedCheckBox={checkedCheckBox}
            setCheckedCheckBox={setCheckedCheckBox}
         />
         <MoviesCardList
            movies={movies}
            cardType="searchMovie"
            indexArr={maxAllowedMovieIndex}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            isChecked={checkedCheckBox}
            savedFavoriteMovies={savedFavoriteMovies}
         />
         <button
            type="button"
            aria-label="addMovies"
            value="add"
            className={addButtonClassName}
            onClick={addButtonOnClick}
         >
            Ещё
         </button>
      </main>
   );
}

export default Movies;
