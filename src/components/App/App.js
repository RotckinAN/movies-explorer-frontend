import { Outlet, Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function BasicLayoutLoggedIn() {
   return (
      <>
         <Header isLoggedIn={true} />
         <Outlet />
         <Footer />
      </>
   );
}

function BasicLayoutNotLoggedIn() {
   return (
      <>
         <Header isLoggedIn={false} />
         <Outlet />
         <Footer />
      </>
   );
}

function BasicLayoutLoggedInWithoutFooter() {
   return (
      <>
         <Header isLoggedIn={true} />
         <Outlet />
      </>
   );
}

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [infoTooltipText, setInfoTooltipText] = useState(
      'Что-то пошло не так!\n' + 'Попробуйте ещё раз.'
   ); // изменится в соответствии с ответом сервера

   function closeAllPopups() {
      setIsInfoTooltipOpen(false);
   }

   return (
      <div className="page">
         {/*<Header />*/}
         <Routes>
            <Route path="/" element={<BasicLayoutNotLoggedIn />}>
               <Route index element={<Main />} />
            </Route>
            <Route path="/" element={<BasicLayoutLoggedIn />}>
               <Route path="movies" element={<Movies />} />
               <Route path="saved-movies" element={<SavedMovies />} />
            </Route>
            <Route path="/" element={<BasicLayoutLoggedInWithoutFooter />}>
               <Route path="profile" element={<Profile />} />
            </Route>

            {/*<Route exact path="/" element={<Main />} />*/}
            {/*<Route path="/movies" element={<Movies />} />*/}
            {/*<Route path="/saved-movies" element={<SavedMovies />} />*/}
            {/*<Route path="/profile" element={<Profile />} />*/}
            <Route
               path="/signup"
               element={
                  <Register setIsInfoTooltipOpen={setIsInfoTooltipOpen} />
               }
               // временно для проверки попапа
            />
            <Route
               path="/signin"
               element={<Login setIsInfoTooltipOpen={setIsInfoTooltipOpen} />}
               // временно для проверки попапа
            />
            <Route path="*" element={<NotFound />} />
         </Routes>
         <InfoTooltip
            loggedIn={isLoggedIn}
            name="infoTooltip"
            isOpen={isInfoTooltipOpen}
            infoText={infoTooltipText}
            onClose={closeAllPopups}
         />
      </div>
   );
}
export default App;
