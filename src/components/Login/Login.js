import UserForm from '../UserForm/UserForm';
import InputOfUserForm from '../InputOfUserForm/InputOfUserForm';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login({ onLogin, isLoggedIn }) {
   const email = useInput();
   const password = useInput();
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

   if (isLoggedIn) {
      return <Navigate to="/" />;
   }

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
      >
         <InputOfUserForm
            id="inputLoginEmail"
            labelName="E-mail"
            type="email"
            onChange={email.handleChange}
            value={email.value || ''}
            inputName="loginEmail"
            isDirty={email.isDirty}
            minLength="2"
            maxLength="30"
            errorMessage={email.inputError}
         />
         <InputOfUserForm
            id="inputLoginPassword"
            labelName="Пароль"
            type="password"
            onChange={password.handleChange}
            value={password.value || ''}
            inputName="loginPassword"
            isDirty={password.isDirty}
            minLength="2"
            errorMessage={password.inputError}
         />
      </UserForm>
   );
}

export default Login;
