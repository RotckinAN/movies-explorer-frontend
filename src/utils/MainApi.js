export const BASE_URL = 'https://api.manofilmai.nomoredomains.rocks';

function request(url, options) {
   return fetch(url, options).then(getRequestData());
}

function getRequestData() {
   return (res) => {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(
         `Произошла ошибка, код ошибки: ${res.status}. Причина: ${res.statusText}`
      );
   };
}

export async function register({ name, email, password }) {
   try {
      return await request(`${BASE_URL}/signup`, {
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
      return await request(`${BASE_URL}/signin`, {
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
      return await request(`${BASE_URL}/users/me`, {
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
      return await request(`${BASE_URL}/signout`, {
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
