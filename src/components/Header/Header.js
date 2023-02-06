import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
         <Navigation isLoggedIn={isLoggedIn} />
         <button
            onClick={handleButtonSideBarOpen}
            className={headerSideBarButtonClassName}
         ></button>
         <SideBar
            isOpen={isSideBarOpen}
            isLoggedIn={isLoggedIn}
            handleButtonClick={handleButtonSideBarClose}
            name="movies"
         />
      </header>
   );
}

export default Header;
