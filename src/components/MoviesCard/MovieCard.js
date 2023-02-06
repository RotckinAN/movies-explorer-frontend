import React, { useState } from 'react';

const MovieCard = ({ cardType, nameRU, duration, imageLink }) => {
   const [isFavorite, setIsFavorite] = useState(false);
   const favoriteButtonClassName = `${
      cardType === 'searchMovie'
         ? !isFavorite
            ? 'movieCard__button movieCard__favoriteButton_inactive'
            : 'movieCard__button movieCard__favoriteButton_active'
         : 'movieCard__favoriteButton_hidden'
   }`;
   const savedButtonClassName = `${
      cardType === 'savedMovie'
         ? 'movieCard__button movieCard__savedButton'
         : 'movieCard__savedButton_hidden'
   }`;
   function timingFunc(dur) {
      return `${Math.floor(dur / 60)}ч ${dur % 60}мин`;
   }

   function handleFavoriteButtonClick(evt) {
      if (evt.target.classList.contains('movieCard__favoriteButton_inactive')) {
         setIsFavorite(true);
      } else {
         setIsFavorite(false);
      }
   }

   return (
      <li className="movieCard">
         <div className="movieCard__titleContainer">
            <div className="movieCard__textContainer">
               <h2 className="movieCard__title">{nameRU}</h2>
               <p className="movieCard__duration">{timingFunc(duration)}</p>
            </div>
            <button
               className={favoriteButtonClassName}
               aria-label="toFavorite"
               onClick={handleFavoriteButtonClick}
            ></button>
            <button
               className={savedButtonClassName}
               aria-label="toFavorite"
            ></button>
         </div>
         <img
            src={imageLink}
            alt={`Photo of movie: '${nameRU}'`}
            className="movieCard__mainImage"
         />
      </li>
   );
};

export default MovieCard;