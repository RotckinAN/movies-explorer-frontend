import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountLinkButton from '../AccountLinkButton/AccountLinkButton';

function Navigation({ isLoggedIn }) {
   const pathName = useLocation().pathname;
   const headerLinkTypeMoviesClassName = `navigation__link navigation__link_type_movies ${
      isLoggedIn ? '' : 'navigation__link_inactive'
   } ${pathName === '/' ? 'navigation__link_type_mainPage' : ''}`;
   const headerLinkTypeSavedMoviesClassName = `navigation__link navigation__link_type_savedMovies ${
      isLoggedIn ? '' : 'navigation__link_inactive'
   } ${pathName === '/' ? 'navigation__link_type_mainPage' : ''}`;
   const headerLinkTypeSignUpClassName = `navigation__link navigation__link_type_signUp ${
      isLoggedIn ? 'navigation__link_inactive' : ''
   }`;
   const headerLinkTypeSignInClassName = `navigation__link navigation__link_type_signIn ${
      isLoggedIn ? 'navigation__link_inactive' : ''
   }`;

   return (
      <nav className="navigation">
         <ul className="navigation__linkContainer">
            <li className="navigation__linkList">
               <Link to={'/'}>
                  <div className="navigation__logoLink"></div>
               </Link>
            </li>
            <li className="navigation__linkList">
               <Link to={'/movies'} className={headerLinkTypeMoviesClassName}>
                  Фильмы
               </Link>
            </li>
            <li className="navigation__linkList">
               <Link
                  to={'/saved-movies'}
                  className={headerLinkTypeSavedMoviesClassName}
               >
                  Сохранённые фильмы
               </Link>
            </li>
         </ul>
         <ul className="navigation__linkContainer navigation__linkContainer_type_auth">
            <li className="navigation__linkList">
               <Link to={'/signup'} className={headerLinkTypeSignUpClassName}>
                  Регистрация
               </Link>
            </li>
            <li className="navigation__linkList">
               <Link to={'/signin'} className={headerLinkTypeSignInClassName}>
                  Войти
               </Link>
            </li>
         </ul>
         <AccountLinkButton isLoggedIn={isLoggedIn} isButtonHidden={true} />
      </nav>
   );
}

export default Navigation;
