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
import { authorize, checkToken, logOut, register } from '../../utils/MainApi';

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
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [isLoggedInImage, setIsLoggedInImage] = useState(false);
   const [infoTooltipText, setInfoTooltipText] = useState('');
   const navigate = useNavigate();

   const userRegister = useCallback(
      async (registrationData) => {
         try {
            const res = await register(registrationData);
            if (!res) {
               throw new Error('Invalid credentials');
            }

            if (res) {
               handleInfoTooltipOpen(true);
               setIsLoggedInImage(true);
               setInfoTooltipText('Вы успешно зарегистрировались!');
               navigate('/signin');
            }
         } catch (err) {
            setInfoTooltipText(
               'Что-то пошло не так!\n' + 'Попробуйте ещё раз.'
            );
            handleInfoTooltipOpen(true);
            throw new Error('Invalid credentials');
         }
      },
      [navigate]
   );

   const userLogin = useCallback(async (registrationData) => {
      try {
         const data = await authorize(registrationData);
         if (!data) {
            throw new Error('Invalid credentials');
         }

         if (data) {
            setIsLoggedIn(true);
            setIsLoggedInImage(true);
            setCurrentUser(data);
            handleInfoTooltipOpen(true);
            setInfoTooltipText('Добро пожаловать!');
         }
      } catch (err) {
         handleInfoTooltipOpen(true);
         setInfoTooltipText('Что-то пошло не так!\n' + 'Попробуйте ещё раз.');
         throw new Error('Invalid credentials');
      }
   }, []);

   const handleTokenCheck = useCallback(async () => {
      try {
         const resUser = await checkToken();
         if (!resUser) {
            throw new Error('Invalid user');
         }

         if (resUser) {
            setCurrentUser(resUser);
            setIsLoggedIn(true);
         }
      } catch (err) {
         throw new Error('Invalid user');
      }
   }, []);

   useEffect(() => {
      handleTokenCheck().catch((err) => {
         console.error(err);
      });
   }, [handleTokenCheck]);

   const userLogout = useCallback(async () => {
      try {
         const logOutUser = await logOut();
         if (logOutUser) {
            setIsLoggedIn(false);
         }
      } catch (err) {
         throw new Error('Invalid credentials');
      }
   }, []);

   function handleInfoTooltipOpen() {
      setIsInfoTooltipOpen(true);
   }

   function closeAllPopups() {
      setIsInfoTooltipOpen(false);
   }

   return (
      <div className="page">
         <CurrentUserContext.Provider value={currentUser}>
            {/*<Header />*/}
            <Routes>
               <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
                  <Route
                     path="/"
                     element={<BasicLayout isLoggedIn={isLoggedIn} />}
                  >
                     <Route path="movies" element={<Movies />} />
                     <Route path="saved-movies" element={<SavedMovies />} />
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
                              submitErrorMessage="Test"
                              userLogout={userLogout}
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
                  element={<Register onRegister={userRegister} />}
               />

               <Route
                  path="/signin"
                  element={
                     <Login onLogin={userLogin} isLoggedIn={isLoggedIn} />
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
