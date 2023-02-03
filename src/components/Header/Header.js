import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';

function Header({ isLoggedIn }) {
   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
   const headerLinkTypeMoviesClassName = `header__link header__link_type_movies ${
      isLoggedIn ? '' : 'header__link_inactive'
   }`;
   const headerLinkTypeSavedMoviesClassName = `header__link header__link_type_savedMovies ${
      isLoggedIn ? '' : 'header__link_inactive'
   }`;
   const headerLinkTypeSignUpClassName = `header__link header__link_type_signUp ${
      isLoggedIn ? 'header__link_inactive' : ''
   }`;
   const headerLinkTypeSignInClassName = `header__link header__link_type_signIn ${
      isLoggedIn ? 'header__link_inactive' : ''
   }`;
   const headerAccountLinkClassName = ` ${
      isLoggedIn ? 'header__accountLink' : 'header__accountLink_inactive'
   }`;
   const headerSideBarButtonClassName = ` ${
      isLoggedIn ? 'header__sideBarButton' : 'header__sideBarButton_inactive'
   }`;

   function handleButtonSideBarOpen() {
      setIsSideBarOpen(true);
   }

   function handleButtonSideBarClose() {
      setIsSideBarOpen(false);
   }

   return (
      <header className="header page__header">
         <nav className="header__container">
            <ul className="header__linkContainer">
               <li className="header__linkList">
                  <Link to={'/'}>
                     <div className="header__logoLink"></div>
                  </Link>
               </li>
               <li className="header__linkList">
                  <Link
                     to={'/movies'}
                     className={headerLinkTypeMoviesClassName}
                  >
                     Фильмы
                  </Link>
               </li>
               <li className="header__linkList">
                  <Link
                     to={'/saved-movies'}
                     className={headerLinkTypeSavedMoviesClassName}
                  >
                     Сохранённые фильмы
                  </Link>
               </li>
            </ul>
            <ul className="header__linkContainer header__linkContainer_type_auth">
               <li className="header__linkList">
                  <Link
                     to={'/signup'}
                     className={headerLinkTypeSignUpClassName}
                  >
                     Регистрация
                  </Link>
               </li>
               <li className="header__linkList">
                  <Link
                     to={'/signin'}
                     className={headerLinkTypeSignInClassName}
                  >
                     Войти
                  </Link>
               </li>
            </ul>
            <Link to={'/profile'} className={headerAccountLinkClassName}>
               Аккаунт
            </Link>
            <button
               onClick={handleButtonSideBarOpen}
               className={headerSideBarButtonClassName}
            ></button>
         </nav>
         <SideBar
            isOpen={isSideBarOpen}
            handleButtonClick={handleButtonSideBarClose}
            name="movies"
         />
      </header>
   );
}

export default Header;
