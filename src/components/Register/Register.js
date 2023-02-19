import UserForm from '../UserForm/UserForm';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import InputOfUserForm from '../InputOfUserForm/InputOfUserForm';
import {
   INPUT_EMAIL_REGEX,
   INPUT_NAME_REGEX,
   INPUT_PASSWORD_REGEX,
} from '../../utils/regex';
import {
   EMPTY_FORM_INPUTS,
   INPUT_EMAIL_ERROR,
   INPUT_NAME_ERROR,
   INPUT_PASSWORD_ERROR,
} from '../../utils/errorMessages';

function Register({ onRegister, requestRegisterErrorMessage }) {
   const name = useInput('');
   const email = useInput('');
   const password = useInput('');
   const [formValid, setFormValid] = useState(false);

   function handleSubmit(evt) {
      evt.preventDefault();
      onRegister({
         name: name.value,
         email: email.value,
         password: password.value,
      });
   }

   useEffect(() => {
      if (name.inputValid && email.inputValid && password.inputValid) {
         setFormValid(true);
      } else {
         setFormValid(false);
      }
   }, [name.inputValid, email.inputValid, password.inputValid]);

   return (
      <UserForm
         name="register"
         title="Добро пожаловать!"
         buttonText="Зарегистрироваться"
         onSubmit={handleSubmit}
         isFormValid={formValid}
         additionalText="Уже зарегистрированы?"
         link="/signin"
         linkText="Войти"
         typeClassName="register"
         errorMessage={requestRegisterErrorMessage}
      >
         <InputOfUserForm
            id="inputRegisterName"
            labelName="Имя"
            type="text"
            onChange={(evt) =>
               name.handleChange(evt, INPUT_NAME_REGEX, INPUT_NAME_ERROR)
            }
            onBlur={() => name.onBlur(EMPTY_FORM_INPUTS, name.value)}
            value={name.value || ''}
            inputName="registerName"
            isDirty={name.isDirty}
            errorMessage={name.inputError}
         />
         <InputOfUserForm
            id="inputRegisterEmail"
            labelName="E-mail"
            type="email"
            onChange={(evt) =>
               email.handleChange(evt, INPUT_EMAIL_REGEX, INPUT_EMAIL_ERROR)
            }
            onBlur={() => email.onBlur(EMPTY_FORM_INPUTS, email.value)}
            value={email.value || ''}
            inputName="registerEmail"
            isDirty={email.isDirty}
            errorMessage={email.inputError}
         />
         <InputOfUserForm
            id="inputRegisterPassword"
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
            inputName="registerPassword"
            isDirty={password.isDirty}
            errorMessage={password.inputError}
         />
      </UserForm>
   );
}

export default Register;
