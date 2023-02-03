import { useNavigate } from 'react-router-dom';

function NotFound() {
   let navigate = useNavigate();
   function handleClick() {
      navigate('/');
   }

   return (
      <div className="notFound">
         <h1 className="notFound__title">404</h1>
         <p className="notFound__subTitle">Страница не найдена</p>
         <button onClick={handleClick} className="notFound__button">
            Назад
         </button>
      </div>
   );
}

export default NotFound;
