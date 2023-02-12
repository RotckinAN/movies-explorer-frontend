// import Header from '../Header/Header';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Profile({ submitErrorMessage, userLogout }) {
   const name = useInput();
   const email = useInput();
   const [formValid, setFormValid] = useState(false);
   const nameInput = useRef(null);
   const emailInput = useRef(null);
   const editButton = useRef(null);
   const mainLinkButton = useRef(null);
   const saveButton = useRef(null);

   const errorNameMessageClassName = `profile__input-error ${
      name.isDirty ? 'profile__input-error_active' : ''
   }`;
   const errorEmailMessageClassName = `profile__input-error ${
      email.isDirty ? 'profile__input-error_active' : ''
   }`;
   const submitMessageClassName = `profile__submitErrorMessage`;
   const navigate = useNavigate();

   function handleButtonExit(evt) {
      evt.preventDefault();
      userLogout();
      navigate('/');
   }

   function handleButtonEdit() {
      nameInput.current.disabled = false;
      emailInput.current.disabled = false;
      editButton.current.classList.add('profile__editButton_invalid');
      mainLinkButton.current.classList.add('profile__editButton_invalid');
      saveButton.current.classList.add('profile__saveButton_invalidActive');
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
         saveButton.current.classList.add('profile__saveButton_active');
      } else {
         setFormValid(false);
         saveButton.current.classList.remove('profile__saveButton_active');
      }
   }, [name.inputValid, email.inputValid, name.value, email.value]);

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
                        disabled
                        ref={nameInput}
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
                        disabled
                        ref={emailInput}
                     />
                  </label>
                  <span
                     className={`${errorEmailMessageClassName} profile__input-error_type_email`}
                  >
                     {email.inputError}
                  </span>
               </div>
               <span className={submitMessageClassName}>
                  {submitErrorMessage}
               </span>
               <button
                  className="profile__saveButton"
                  type="submit"
                  value="Сохранить"
                  id="profileSaveButton"
                  disabled={!formValid}
                  ref={saveButton}
               >
                  Сохранить
               </button>
            </form>
            <button
               className="profile__editButton"
               type="button"
               value="Редактировать"
               id="profileEditButton"
               onClick={handleButtonEdit}
               ref={editButton}
            >
               Редактировать
            </button>
            <button
               className="profile__editButton profile__editButton_type_exit"
               onClick={handleButtonExit}
               ref={mainLinkButton}
            >
               Выйти из аккаунта
            </button>
         </main>
      </>
   );
}

export default Profile;
