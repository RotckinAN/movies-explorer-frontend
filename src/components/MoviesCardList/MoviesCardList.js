import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';

function MoviesCardList({
   movies,
   cardType,
   indexArr,
   onMovieSave,
   onMovieDelete,
   isChecked,
   savedFavoriteMovies,
}) {
   const imageSearchMoviePath = (movie) =>
      `https://api.nomoreparties.co/${movie.image.url}`;
   const imageSaveMoviePath = (movie) => `${movie.image}`;

   return (
      <section className="moviesCardList">
         <ul className="moviesCardList__list">
            {movies
               .filter((movie) => (isChecked ? movie['duration'] <= 40 : movie))
               .map((movie, index) => {
                  if (index < indexArr || !indexArr) {
                     return (
                        <MovieCard
                           movie={movie}
                           key={
                              cardType === 'searchMovie'
                                 ? movie.id
                                 : movie.movieId
                           }
                           cardType={cardType}
                           nameRU={movie.nameRU}
                           duration={movie.duration}
                           imageLink={
                              cardType === 'searchMovie'
                                 ? imageSearchMoviePath(movie)
                                 : imageSaveMoviePath(movie)
                           }
                           onMovieSave={onMovieSave}
                           onMovieDelete={onMovieDelete}
                           savedFavoriteMovies={savedFavoriteMovies}
                        />
                     );
                  }
               })}
         </ul>
      </section>
   );
}

export default MoviesCardList;
