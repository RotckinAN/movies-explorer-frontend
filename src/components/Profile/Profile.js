import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { INPUT_EMAIL_REGEX, INPUT_NAME_REGEX } from '../../utils/regex';
import { INPUT_EMAIL_ERROR, INPUT_NAME_ERROR } from '../../utils/errorMessages';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({
   submitErrorMessage,
   userLogout,
   onSubmit,
   isSubmitButtonActive,
   setIsSubmitButtonActive,
   isProfileInputDisabled,
   setIsProfileInputDisabled,
   isSubmitButtonValidCheck,
   setSubmitButtonIsValidCheck,
}) {
   const userContext = useContext(CurrentUserContext);
   const name = useInput(userContext.name);
   const email = useInput(userContext.email);
   const [formValid, setFormValid] = useState(false);

   const editButtonClassName = `profile__editButton ${
      isSubmitButtonActive ? 'profile__editButton_invalid' : ''
   }`;
   const mainLinkButtonClassName = `profile__editButton profile__editButton_type_exit ${
      isSubmitButtonActive ? 'profile__editButton_invalid' : ''
   }`;
   const saveButtonClassName = `profile__saveButton ${
      isSubmitButtonActive ? 'profile__saveButton_invalidActive' : ''
   } ${isSubmitButtonValidCheck ? 'profile__saveButton_active' : ''}`;

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

   function handleButtonEdit() {
      setIsSubmitButtonActive(true);
      setIsProfileInputDisabled(false);
   }

   function handleOnSubmit(evt) {
      evt.preventDefault();
      onSubmit({
         name: name.value,
         email: email.value,
      });
   }

   useEffect(() => {
      if (
         name.inputValid &&
         email.inputValid &&
         name.value !== userContext.name &&
         email.value !== userContext.email
      ) {
         setFormValid(true);
         setSubmitButtonIsValidCheck(true);
      } else {
         setFormValid(false);
         setSubmitButtonIsValidCheck(false);
      }
   }, [name.inputValid, email.inputValid, name.value, email.value]);

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
                        disabled={isProfileInputDisabled}
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
                        disabled={isProfileInputDisabled}
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
                  className={saveButtonClassName}
                  type="submit"
                  value="Сохранить"
                  id="profileSaveButton"
                  disabled={!formValid}
               >
                  Сохранить
               </button>
            </form>
            <button
               className={editButtonClassName}
               type="button"
               value="Редактировать"
               id="profileEditButton"
               onClick={handleButtonEdit}
            >
               Редактировать
            </button>
            <button
               className={mainLinkButtonClassName}
               onClick={handleButtonExit}
            >
               Выйти из аккаунта
            </button>
         </main>
      </>
   );
}

export default Profile;
