import { MOVIE_BASE_URL } from './constants';

function request(url, options) {
   return fetch(url, options).then((res) => res);
}

export async function getInitialMovies() {
   try {
      return await request(`${MOVIE_BASE_URL}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (err) {
      console.error(err);
   }
}
