import Header from '../Header/Header';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {
   const name = useInput();
   const email = useInput();
   const [formValid, setFormValid] = useState(false);

   const errorNameMessageClassName = `profile__input-error ${
      name.isDirty ? 'profile__input-error_active' : ''
   }`;
   const errorEmailMessageClassName = `profile__input-error ${
      email.isDirty ? 'profile__input-error_active' : ''
   }`;
   const buttonClassName = `profile__button ${
      formValid ? '' : 'profile__button_invalid'
   }`;
   const navigate = useNavigate();

   function handleButtonExit(evt) {
      evt.preventDefault();
      navigate('/');
   }

   function handleOnSubmit(evt) {
      evt.preventDefault();
      // будет код
   }

   useEffect(() => {
      if (
         name.inputValid &&
         email.inputValid &&
         name.value !== 'Виталий' &&
         email.value !== 'pochta@yandex.ru'
      ) {
         setFormValid(true);
      } else {
         setFormValid(false);
      }
   }, [name.inputValid, email.inputValid]);

   return (
      <>
         {/*хэдер для теста */}
         {/*<Header isLoggedIn={true} />*/}
         <main className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form
               className="profile__container"
               onSubmit={handleOnSubmit}
               name="profileEditForm"
               noValidate
            >
               <div className="profile__inputContainer">
                  <label
                     htmlFor="profileName"
                     className="profile__titleContainer"
                  >
                     Имя
                     <input
                        className="profile__info"
                        type="text"
                        onChange={name.handleChange}
                        value={name.value || 'Виталий'}
                        autoComplete="off"
                        id="profileName"
                        minLength="2"
                        maxLength="30"
                     />
                  </label>
                  <span className={errorNameMessageClassName}>
                     {name.inputError}
                  </span>
               </div>
               <div className="profile__inputContainer">
                  <label
                     htmlFor="profileEmail"
                     className="profile__titleContainer"
                  >
                     E-mail
                     <input
                        className="profile__info"
                        type="email"
                        onChange={email.handleChange}
                        value={email.value || 'pochta@yandex.ru'}
                        autoComplete="off"
                        id="profileEmail"
                        minLength="2"
                        maxLength="30"
                     />
                  </label>
                  <span
                     className={`${errorEmailMessageClassName} profile__input-error_type_email`}
                  >
                     {email.inputError}
                  </span>
               </div>
               <button
                  className={buttonClassName}
                  type="submit"
                  value="Редактировать"
                  id="profileSaveButton"
                  disabled={!formValid}
               >
                  Редактировать
               </button>
            </form>
            <button
               className="profile__button profile__button_type_exit"
               onClick={handleButtonExit}
            >
               Выйти из аккаунта
            </button>
         </main>
      </>
   );
}

export default Profile;
