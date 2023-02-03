import { Link, NavLink } from 'react-router-dom';

function SideBar({ isOpen, handleButtonClick }) {
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
            <Link to={'/profile'} className="sideBar__accountLink">
               Аккаунт
            </Link>
         </nav>
      </div>
   );
}

export default SideBar;
