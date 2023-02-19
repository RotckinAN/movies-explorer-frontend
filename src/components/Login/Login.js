import UserForm from '../UserForm/UserForm';
import InputOfUserForm from '../InputOfUserForm/InputOfUserForm';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import { INPUT_EMAIL_REGEX, INPUT_PASSWORD_REGEX } from '../../utils/regex';
import {
   EMPTY_FORM_INPUTS,
   INPUT_EMAIL_ERROR,
   INPUT_PASSWORD_ERROR,
} from '../../utils/errorMessages';

function Login({ onLogin, requestLoginErrorMessage }) {
   const email = useInput('');
   const password = useInput('');
   const [formValid, setFormValid] = useState(false);

   function handleSubmit(evt) {
      evt.preventDefault();
      onLogin({
         email: email.value,
         password: password.value,
      });
   }

   useEffect(() => {
      if (email.inputValid && password.inputValid) {
         setFormValid(true);
      } else {
         setFormValid(false);
      }
   }, [email.inputValid, password.inputValid]);

   return (
      <UserForm
         name="login"
         title="Рады видеть!"
         buttonText="Войти"
         onSubmit={handleSubmit}
         isFormValid={formValid}
         additionalText="Ещё не зарегистрированы?"
         link="/signup"
         linkText="Регистрация"
         additionalClassName="userFrom__saveButton_type_login"
         typeClassName="login"
         errorMessage={requestLoginErrorMessage}
      >
         <InputOfUserForm
            id="inputLoginEmail"
            labelName="E-mail"
            type="email"
            onChange={(evt) =>
               email.handleChange(evt, INPUT_EMAIL_REGEX, INPUT_EMAIL_ERROR)
            }
            onBlur={() => email.onBlur(EMPTY_FORM_INPUTS, email.value)}
            value={email.value || ''}
            inputName="loginEmail"
            isDirty={email.isDirty}
            errorMessage={email.inputError}
         />
         <InputOfUserForm
            id="inputLoginPassword"
            labelName="Пароль"
            type="password"
            onChange={(evt) =>
               password.handleChange(
                  evt,
                  INPUT_PASSWORD_REGEX,
                  INPUT_PASSWORD_ERROR
               )
            }
            onBlur={() => password.onBlur(EMPTY_FORM_INPUTS, password.value)}
            value={password.value || ''}
            inputName="loginPassword"
            isDirty={password.isDirty}
            errorMessage={password.inputError}
         />
      </UserForm>
   );
}

export default Login;
