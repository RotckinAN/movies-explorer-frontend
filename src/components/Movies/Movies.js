// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import useInput from '../../hooks/useInput';
import { useState } from 'react';
// import MovieCard from '../MoviesCard/MovieCard';
import { movies } from '../../utils/movies';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
   const movie = useInput();
   const [isMovieSearchValid, setIsMovieSearchValid] = useState(false);
   const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);

   function handleSubmit(evt) {
      evt.preventDefault();
      setIsMovieSearchValid(true);
      setIsPreloaderOpen(true);
      // будет код
   }

   return (
      <main className="movies">
         {/*хэдер для теста */}
         {/*<Header isLoggedIn={true} />*/}
         <SearchForm
            id="inputSearchMovie"
            onChange={movie.handleChange}
            value={movie.value || ''}
            inputName="searchMovie"
            isDirty={isMovieSearchValid}
            errorMessage="Нужно ввести ключевое слово"
            name="searchNewMovie"
            onSubmit={handleSubmit}
         />
         <MoviesCardList movies={movies} cardType="searchMovie" />
         <button
            type="button"
            aria-label="addMovies"
            value="add"
            className="movies__addButton"
         >
            Ещё
         </button>

         <Preloader isOpen={isPreloaderOpen} />
         {/*<Footer />*/}
      </main>
   );
}

export default Movies;
