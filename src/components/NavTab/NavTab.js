import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';

function NavTab({ aboutProject, techs, aboutMe, portfolio }) {
   const [isNavigationsButtonOpen, setIsNavigationsButtonOpen] =
      useState(false);

   const navBarClassName = `navTab__button ${
      isNavigationsButtonOpen ? 'navTab__button_type_active' : ''
   }`;
   const navTabButtonTypeNavigateClassName = `navTab__button navTab__button_type_navigate ${
      isNavigationsButtonOpen ? '' : 'navTab__button_type_inactive'
   }`;

   function handleButtonsNavigationOpen(evt) {
      if (evt.target.classList.contains('navTab__button_type_active')) {
         setIsNavigationsButtonOpen(false);
      } else {
         setIsNavigationsButtonOpen(true);
      }
   }

   return (
      <nav className="navTab">
         <button
            className={navBarClassName}
            onClick={handleButtonsNavigationOpen}
         >
            Узнать больше
         </button>
         <div className="navTab__linkContainer">
            <HashLink
               smooth
               to={`#${aboutProject}`}
               className={navTabButtonTypeNavigateClassName}
            >
               О проекте
            </HashLink>
            <HashLink
               smooth
               to={`#${techs}`}
               className={navTabButtonTypeNavigateClassName}
            >
               Технологии
            </HashLink>
            <HashLink
               smooth
               to={`#${aboutMe}`}
               className={navTabButtonTypeNavigateClassName}
            >
               Студент
            </HashLink>
            <HashLink
               smooth
               to={`#${portfolio}`}
               className={navTabButtonTypeNavigateClassName}
            >
               Портфолио
            </HashLink>
         </div>
      </nav>
   );
}
export default NavTab;
