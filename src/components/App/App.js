import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useCallback, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
   authorize,
   checkToken,
   deleteSavedMovie,
   getFavoriteMovies,
   logOut,
   patchProfileInfo,
   register,
   saveFavoriteMovie,
} from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import { getInitialMovies } from '../../utils/MoviesApi';
import {
   BAD_REQUEST_MOVIE_DELETE,
   BAD_REQUEST_MOVIES_SEARCH,
   EMPTY_MOVIES_SEARCH_INPUT,
   NOTHING_FOUND,
} from '../../utils/errorMessages';
import { findMovies } from '../../utils/findMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

function BasicLayout({ isLoggedIn }) {
   return (
      <>
         <Header isLoggedIn={isLoggedIn} />
         <Outlet />
         <Footer />
      </>
   );
}

function BasicLayoutWithoutFooter({ isLoggedIn }) {
   return (
      <>
         <Header isLoggedIn={isLoggedIn} />
         <Outlet />
      </>
   );
}

function App() {
   const [currentUser, setCurrentUser] = useState({});
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isLoadingPage, setIsLoadingPage] = useState(true);
   const [isLoadingMoviesRequest, setIsLoadingMoviesRequest] = useState(false);
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [isLoggedInImage, setIsLoggedInImage] = useState(false);
   const [isAddMoviesButtonActive, setIsAddMoviesButtonActive] = useState(true);
   useState(false);
   const [isMovieSearchInvalid, setIsMovieSearchInvalid] = useState(false);
   const [infoTooltipText, setInfoTooltipText] = useState('');
   const [requestRegisterErrorMessage, setRequestRegisterErrorMessage] =
      useState('');
   const [requestLoginErrorMessage, setRequestLoginErrorMessage] = useState('');
   const [requestEditUserInfoErrorMessage, setRequestEditUserInfoErrorMessage] =
      useState('');
   const [requestMoviesErrorMessage, setRequestMoviesErrorMessage] =
      useState('');
   const [initialMoviesByRequest, setInitialMoviesByRequest] = useLocalStorage(
      'initialMovies',
      []
   );
   const [movies, setMovies] = useLocalStorage('movies', []);
   const [savedFavoriteMovies, setSavedFavoriteMovies] = useState([]);
   const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]);
   const navigate = useNavigate();

   const userRegister = useCallback(
      async (registrationData) => {
         try {
            const res = await register(registrationData);
            if (!res) {
               throw new Error('Invalid credentials');
            }

            if (res.status !== 201) {
               const response = await res.json();
               setRequestRegisterErrorMessage(response.message);
               throw new Error(
                  `Произошла ошибка, код ошибки: ${res.status}. Причина: ${res.statusText}`
               );
            } else if (res.status === 201) {
               const response = await res.json();
               setIsLoggedIn(true);
               setCurrentUser(response);
               navigate('/movies');
            }
         } catch (err) {
            setRequestLoginErrorMessage('Invalid credentials');
            throw new Error('Invalid credentials');
         }
      },
      [navigate]
   );

   const userLogin = useCallback(
      async (registrationData) => {
         try {
            const data = await authorize(registrationData);

            if (!data) {
               throw new Error('Invalid credentials');
            }
            const userByResponse = await data.json();

            if (data.ok) {
               setIsLoggedIn(true);
               navigate('/movies');
            } else if (!data.ok) {
               setRequestLoginErrorMessage(userByResponse.message);
               throw new Error(
                  `Произошла ошибка, код ошибки: ${data.status}. Причина: ${data.statusText}`
               );
            }
         } catch (err) {
            setRequestLoginErrorMessage('Invalid credentials');
            throw new Error('Invalid credentials');
         } finally {
            setIsLoadingPage(false);
         }
      },
      [navigate]
   );

   const handleTokenCheck = useCallback(async () => {
      try {
         const resUser = await checkToken();
         if (!resUser) {
            throw new Error('Invalid user');
         }
         const userByResponse = await resUser.json();

         if (resUser.ok) {
            setCurrentUser(userByResponse);
            setIsLoggedIn(true);
         } else if (!resUser.ok) {
            throw new Error(
               `Произошла ошибка, код ошибки: ${resUser.status}. Причина: ${resUser.statusText}`
            );
         }
      } catch (err) {
         throw new Error('Invalid user');
      } finally {
         setIsLoadingPage(false);
      }
   }, []);

   useEffect(() => {
      handleTokenCheck().catch((err) => {
         console.error(err);
      });
   }, [handleTokenCheck, isLoggedIn]);

   const userLogout = async () => {
      try {
         const logOutUser = await logOut();
         if (logOutUser) {
            setIsLoggedIn(false);
            localStorage.clear();
            setInitialMoviesByRequest([]);
            setMovies([]);
            setSavedFavoriteMovies([]);
            setFilteredFavoriteMovies([]);
         }
      } catch (err) {
         throw new Error('Invalid credentials');
      }
   };

   const handleUpdateUser = async (userInfo) => {
      try {
         const userByRequest = await patchProfileInfo(userInfo);
         if (!userByRequest) {
            throw new Error('Invalid credentials');
         }
         const response = await userByRequest.json();

         if (userByRequest.status !== 200) {
            setRequestEditUserInfoErrorMessage(response.message);
            throw new Error(
               `Произошла ошибка, код ошибки: ${userByRequest.status}. Причина: ${userByRequest.statusText}`
            );
         } else if (userByRequest.status === 200) {
            setCurrentUser(response);
            setIsInfoTooltipOpen(true);
            setIsLoggedInImage(true);
            setRequestEditUserInfoErrorMessage('');
            setInfoTooltipText('Данные пользователя успешно обновлены');
            navigate('/profile');
         }
      } catch (err) {
         throw new Error('Invalid credentials');
      }
   };

   const searchMoviesInStorage = useCallback(
      (moviesStorage, searchData) => {
         const searchResult = findMovies(moviesStorage, searchData);
         if (searchResult.length === 0) {
            setIsMovieSearchInvalid(true);
            setRequestMoviesErrorMessage(NOTHING_FOUND);
            setMovies([]);
         } else {
            setMovies(searchResult);
            setIsMovieSearchInvalid(false);
            setRequestMoviesErrorMessage('');
         }
      },
      [setMovies]
   );

   const getInitialMoviesByRequest = useCallback(
      async (searchData) => {
         setIsLoadingMoviesRequest(true);

         try {
            if (initialMoviesByRequest.length === 0) {
               const moviesBYRequest = await getInitialMovies();

               if (!moviesBYRequest) {
                  throw new Error(BAD_REQUEST_MOVIES_SEARCH);
               }
               if (moviesBYRequest.ok) {
                  const response = await moviesBYRequest.json();
                  setInitialMoviesByRequest(response);

                  searchMoviesInStorage(response, searchData);
               } else if (!moviesBYRequest.ok) {
                  setIsMovieSearchInvalid(true);
                  setRequestMoviesErrorMessage(BAD_REQUEST_MOVIES_SEARCH);
                  setMovies([]);
                  throw new Error(
                     `Произошла ошибка, код ошибки: ${moviesBYRequest.status}. Причина: ${moviesBYRequest.statusText}`
                  );
               }
            } else {
               searchMoviesInStorage(initialMoviesByRequest, searchData);
            }
         } catch (err) {
            setIsMovieSearchInvalid(true);
            setRequestMoviesErrorMessage(BAD_REQUEST_MOVIES_SEARCH);
            setMovies([]);
            throw new Error('Произошла ошибка запроса данных');
         } finally {
            setIsLoadingMoviesRequest(false);
         }
      },
      [
         initialMoviesByRequest,
         searchMoviesInStorage,
         setInitialMoviesByRequest,
         setMovies,
      ]
   );

   const handleSearchFilm = (value) => {
      if (value) {
         getInitialMoviesByRequest(value).catch((err) => {
            console.error(err);
         });
      } else {
         setIsMovieSearchInvalid(true);
         setRequestMoviesErrorMessage(EMPTY_MOVIES_SEARCH_INPUT);
         setMovies([]);
         setIsAddMoviesButtonActive(false);
      }
   };

   const handleSaveMovie = async ({
      country,
      director,
      duration,
      year,
      description,
      image: {
         url: imageURL,
         formats: {
            thumbnail: { url: thumbnailURL },
         },
      },
      trailerLink,
      id: movieId,
      nameRU,
      nameEN,
   }) => {
      try {
         const saveMovie = await saveFavoriteMovie({
            country,
            director,
            duration,
            year,
            description,
            image: `https://api.nomoreparties.co${imageURL}`,
            thumbnail: `https://api.nomoreparties.co${thumbnailURL}`,
            trailerLink,
            movieId,
            nameRU,
            nameEN,
         });

         if (!saveMovie) {
            throw new Error(BAD_REQUEST_MOVIES_SEARCH);
         }

         const response = await saveMovie.json();

         if (saveMovie.ok) {
            setSavedFavoriteMovies((prevMovies) => [...prevMovies, response]);
         } else {
            throw new Error(
               `Произошла ошибка, код ошибки: ${saveMovie.status}. Причина: ${saveMovie.statusText}`
            );
         }
      } catch (err) {
         throw new Error('Произошла ошибка запроса данных');
      }
   };

   const handleDeleteSavedMovie = async (movie) => {
      try {
         const deleteMovie = await deleteSavedMovie(movie._id);

         if (!deleteMovie) {
            throw new Error(BAD_REQUEST_MOVIE_DELETE);
         }

         if (deleteMovie.ok) {
            setSavedFavoriteMovies((prevMovies) =>
               prevMovies.filter((prevMovie) => prevMovie._id !== movie._id)
            );
            setFilteredFavoriteMovies((prevMovies) =>
               prevMovies.filter((prevMovie) => prevMovie._id !== movie._id)
            );
         } else {
            throw new Error(
               `Произошла ошибка, код ошибки: ${deleteMovie.status}. Причина: ${deleteMovie.statusText}`
            );
         }
      } catch (err) {
         throw new Error('Произошла ошибка запроса данных');
      }
   };

   const getFavoriteMoviesByRequest = useCallback(async () => {
      try {
         const savedMovies = await getFavoriteMovies();

         if (savedMovies.ok) {
            const response = await savedMovies.json();

            setSavedFavoriteMovies(
               response.filter((movie) => movie.owner === currentUser._id)
            );
         } else {
            setSavedFavoriteMovies([]);
            throw new Error(
               `Произошла ошибка, код ошибки: ${savedMovies.status}. Причина: ${savedMovies.statusText}`
            );
         }
      } catch (err) {
         throw new Error('Произошла ошибка запроса данных');
      }
   }, [currentUser]);

   const handleSearchMovieSaved = (searchData) => {
      const searchResult = findMovies(savedFavoriteMovies, searchData);

      if (searchResult.length === 0) {
         setIsMovieSearchInvalid(true);
         setRequestMoviesErrorMessage(NOTHING_FOUND);
         setFilteredFavoriteMovies([]);
      } else {
         setFilteredFavoriteMovies(searchResult);
         setIsMovieSearchInvalid(false);
         setRequestMoviesErrorMessage('');
      }
   };

   useEffect(() => {
      if (isLoggedIn) {
         getFavoriteMoviesByRequest().catch((err) => {
            console.error(err);
         });
      }
   }, [isLoggedIn, getFavoriteMoviesByRequest]);

   function closeAllPopups() {
      setIsInfoTooltipOpen(false);
   }

   if (isLoadingPage) {
      return <Preloader isOpen={true} />;
   }

   if (isLoadingMoviesRequest) {
      return <Preloader isOpen={true} />;
   }

   return (
      <div className="page">
         <CurrentUserContext.Provider value={currentUser}>
            <Routes>
               <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
                  <Route
                     path="/"
                     element={<BasicLayout isLoggedIn={isLoggedIn} />}
                  >
                     <Route
                        path="movies"
                        element={
                           <Movies
                              movies={movies}
                              requestMoviesErrorMessage={
                                 requestMoviesErrorMessage
                              }
                              isMovieSearchInvalid={isMovieSearchInvalid}
                              setIsMovieSearchInvalid={setIsMovieSearchInvalid}
                              onSubmit={handleSearchFilm}
                              isAddMoviesButtonActive={isAddMoviesButtonActive}
                              setIsAddMoviesButtonActive={
                                 setIsAddMoviesButtonActive
                              }
                              onMovieSave={handleSaveMovie}
                              onMovieDelete={handleDeleteSavedMovie}
                              savedFavoriteMovies={savedFavoriteMovies}
                           />
                        }
                     />
                     <Route
                        path="saved-movies"
                        element={
                           <SavedMovies
                              setIsMovieSearchInvalid={setIsMovieSearchInvalid}
                              isMovieSearchInvalid={isMovieSearchInvalid}
                              requestMoviesErrorMessage={
                                 requestMoviesErrorMessage
                              }
                              savedFavoriteMovies={savedFavoriteMovies}
                              onMovieDelete={handleDeleteSavedMovie}
                              onSubmit={handleSearchMovieSaved}
                              filteredFavoriteMovies={filteredFavoriteMovies}
                           />
                        }
                     />
                  </Route>
                  <Route
                     path="/"
                     element={
                        <BasicLayoutWithoutFooter isLoggedIn={isLoggedIn} />
                     }
                  >
                     <Route
                        path="profile"
                        element={
                           <Profile
                              submitErrorMessage={
                                 requestEditUserInfoErrorMessage
                              }
                              userLogout={userLogout}
                              onSubmit={handleUpdateUser}
                           />
                        }
                     />
                  </Route>
               </Route>

               <Route
                  path="/"
                  element={<BasicLayout isLoggedIn={isLoggedIn} />}
               >
                  <Route index element={<Main />} />
               </Route>

               <Route
                  path="/signup"
                  element={
                     <Register
                        onRegister={userRegister}
                        requestRegisterErrorMessage={
                           requestRegisterErrorMessage
                        }
                        isLoggedIn={isLoggedIn}
                     />
                  }
               />

               <Route
                  path="/signin"
                  element={
                     <Login
                        onLogin={userLogin}
                        requestLoginErrorMessage={requestLoginErrorMessage}
                        isLoggedIn={isLoggedIn}
                     />
                  }
               />
               <Route path="*" element={<NotFound />} />
            </Routes>

            <InfoTooltip
               loggedIn={isLoggedInImage}
               name="infoTooltip"
               isOpen={isInfoTooltipOpen}
               infoText={infoTooltipText}
               onClose={closeAllPopups}
            />
         </CurrentUserContext.Provider>
      </div>
   );
}
export default App;
