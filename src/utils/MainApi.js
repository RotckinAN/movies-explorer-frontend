import { MAIN_URL } from './constants';

function request(url, options) {
   return fetch(url, options).then((res) => res);
}

export async function register({ name, email, password }) {
   try {
      return await request(`${MAIN_URL}/signup`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email, password }),
      });
   } catch (err) {
      console.error(err);
   }
}

export async function authorize({ email, password }) {
   try {
      return await request(`${MAIN_URL}/signin`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
      });
   } catch (err) {
      console.error(err);
   }
}

export async function checkToken() {
   try {
      return await request(`${MAIN_URL}/users/me`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (err) {
      console.error(err);
   }
}

export async function logOut() {
   try {
      return await request(`${MAIN_URL}/signout`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (err) {
      console.error(err);
   }
}

export async function patchProfileInfo({ name, email }) {
   try {
      return await request(`${MAIN_URL}/users/me`, {
         method: 'PATCH',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email }),
      });
   } catch (err) {
      console.error(err);
   }
}

export async function getFavoriteMovies() {
   try {
      return await request(`${MAIN_URL}/movies`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (err) {
      console.error(err);
   }
}

export async function saveFavoriteMovie({
   country,
   director,
   duration,
   year,
   description,
   image,
   trailerLink,
   thumbnail,
   movieId,
   nameRU,
   nameEN,
}) {
   try {
      return await request(`${MAIN_URL}/movies`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
            nameRU,
            nameEN,
         }),
      });
   } catch (err) {
      console.error(err);
   }
}

export async function deleteSavedMovie(movieId) {
   try {
      return await request(`${MAIN_URL}/movies/${movieId}`, {
         method: 'DELETE',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   } catch (err) {
      console.error(err);
   }
}
