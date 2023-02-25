export const findMovies = (movieArr, word) => {
   return movieArr
      .map((movie) => {
         let result = [];

         for (const [key, value] of Object.entries(movie)) {
            if (
               key === 'nameRU' ||
               key === 'nameEN' ||
               key === 'director' ||
               key === 'country' ||
               key === 'description' ||
               key === 'year'
            ) {
               result.push(value.toLowerCase().includes(word.toLowerCase()));
            }
         }

         return result.includes(true) ? movie : null;
      })
      .filter((item) => item !== null);
};
