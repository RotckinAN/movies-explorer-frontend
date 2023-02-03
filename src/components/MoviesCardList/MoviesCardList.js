import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';

function MoviesCardList({ movies, cardType }) {
   return (
      <section className="moviesCardList">
         <ul className="moviesCardList__list">
            {movies.map((movie) => (
               <MovieCard
                  key={movie.id}
                  cardType={cardType}
                  nameRU={movie.nameRU}
                  duration={movie.duration}
                  imageLink={`https://api.nomoreparties.co/${movie.image.url}`}
               />
            ))}
         </ul>
      </section>
   );
}

export default MoviesCardList;
