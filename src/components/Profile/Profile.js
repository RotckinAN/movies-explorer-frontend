import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { INPUT_EMAIL_REGEX, INPUT_NAME_REGEX } from '../../utils/regex';
import { INPUT_EMAIL_ERROR, INPUT_NAME_ERROR } from '../../utils/errorMessages';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({ submitErrorMessage, userLogout, onSubmit }) {
   const userContext = useContext(CurrentUserContext);
   const name = useInput(userContext.name);
   const email = useInput(userContext.email);
   const [formValid, setFormValid] = useState(false);
   const [isNameValueOnFocus, setIsNameValueOnFocus] = useState(false);
   const [isEmailValueOnFocus, setIsEmailValueOnFocus] = useState(false);

   const editButtonClassName = `profile__editButton ${
      formValid ? 'profile__editButton_active' : ''
   } `;
   const errorNameMessageClassName = `profile__input-error ${
      name.isDirty ? 'profile__input-error_active' : ''
   }`;
   const errorEmailMessageClassName = `profile__input-error ${
      email.isDirty ? 'profile__input-error_active' : ''
   }`;
   const navigate = useNavigate();

   function handleButtonExit(evt) {
      evt.preventDefault();
      userLogout();
      navigate('/');
   }

   function handleOnSubmit(evt) {
      evt.preventDefault();
      onSubmit({
         name: name.value,
         email: email.value,
      });
      setFormValid(false);
      setIsNameValueOnFocus(false);
      setIsEmailValueOnFocus(false);
      name.setInputInFocus(false);
      email.setInputInFocus(false);
   }

   useEffect(() => {
      if (name.inputInFocus === 'name') {
         setIsNameValueOnFocus(true);
      }
      if (email.inputInFocus === 'email') {
         setIsEmailValueOnFocus(true);
      }
   }, [name.inputInFocus, email.inputInFocus]);

   useEffect(() => {
      if (
         (!isEmailValueOnFocus &&
            name.inputValid &&
            name.value !== userContext.name) ||
         (!isNameValueOnFocus &&
            email.inputValid &&
            email.value !== userContext.email) ||
         (isEmailValueOnFocus &&
            isNameValueOnFocus &&
            name.value !== userContext.name &&
            email.value !== userContext.email &&
            email.inputValid &&
            email.value)
      ) {
         setFormValid(true);
      } else {
         setFormValid(false);
      }
   }, [
      name.value,
      email.value,
      name.inputValid,
      email.inputValid,
      userContext.name,
      userContext.email,
      isEmailValueOnFocus,
      isNameValueOnFocus,
      formValid,
   ]);

   return (
      <>
         <main className="profile">
            <h1 className="profile__title">Привет, {userContext.name}!</h1>
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
                        name="name"
                        onChange={(evt) =>
                           name.handleChange(
                              evt,
                              INPUT_NAME_REGEX,
                              INPUT_NAME_ERROR
                           )
                        }
                        value={name.value}
                        autoComplete="off"
                        id="profileName"
                        minLength="2"
                        maxLength="30"
                        onFocus={(evt) => name.onFocus(evt)}
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
                        name="email"
                        onChange={(evt) =>
                           email.handleChange(
                              evt,
                              INPUT_EMAIL_REGEX,
                              INPUT_EMAIL_ERROR
                           )
                        }
                        value={email.value}
                        autoComplete="off"
                        id="profileEmail"
                        minLength="2"
                        maxLength="30"
                        onFocus={(evt) => email.onFocus(evt)}
                     />
                  </label>
                  <span
                     className={`${errorEmailMessageClassName} profile__input-error_type_email`}
                  >
                     {email.inputError}
                  </span>
               </div>
               <span className="profile__submitErrorMessage">
                  {submitErrorMessage}
               </span>
               <button
                  className={editButtonClassName}
                  type="submit"
                  value="Редактировать"
                  id="profileEditButton"
                  disabled={!formValid}
               >
                  Редактировать
               </button>
            </form>
            <button
               className="profile__editButton profile__editButton_type_exit"
               onClick={handleButtonExit}
            >
               Выйти из аккаунта
            </button>
         </main>
      </>
   );
}

export default Profile;
