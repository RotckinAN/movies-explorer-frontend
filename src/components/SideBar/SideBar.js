import { NavLink } from 'react-router-dom';
import AccountLinkButton from '../AccountLinkButton/AccountLinkButton';

function SideBar({ isOpen, handleButtonClick, isLoggedIn }) {
   let activeStyle = {
      borderBottom: 'solid 2px black',
   };

   return (
      <div className={`sideBar ${isOpen ? 'sideBar_opened' : ''}`}>
         <nav className="sideBar__container">
            <button
               onClick={handleButtonClick}
               className="sideBar__closeButton"
            ></button>
            <ul className="sideBar__linkContainer">
               <li className="sideBar__linkList">
                  <NavLink
                     to={'/'}
                     className="sideBar__link"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Главная
                  </NavLink>
               </li>
               <li className="sideBar__linkList">
                  <NavLink
                     to={'/movies'}
                     className="sideBar__link"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Фильмы
                  </NavLink>
               </li>
               <li className="sideBar__linkList">
                  <NavLink
                     to={'/saved-movies'}
                     className="sideBar__link"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Сохранённые фильмы
                  </NavLink>
               </li>
            </ul>
            <AccountLinkButton isLoggedIn={isLoggedIn} isButtonHidden={false} />
         </nav>
      </div>
   );
}

export default SideBar;
