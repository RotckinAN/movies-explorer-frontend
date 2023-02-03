import UserForm from '../UserForm/UserForm';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import InputOfUserForm from '../InputOfUserForm/InputOfUserForm';

function Register({ setIsInfoTooltipOpen }) {
   const name = useInput();
   const email = useInput();
   const password = useInput();
   const [formValid, setFormValid] = useState(false);

   function handleSubmit(evt) {
      evt.preventDefault();
      setIsInfoTooltipOpen(true); // временно для проверки
      // будет код
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
      >
         <InputOfUserForm
            id="inputRegisterName"
            labelName="Имя"
            type="text"
            onChange={name.handleChange}
            value={name.value || ''}
            inputName="registerName"
            isDirty={name.isDirty}
            minLength="2"
            maxLength="30"
            errorMessage={name.inputError}
         />
         <InputOfUserForm
            id="inputRegisterEmail"
            labelName="E-mail"
            type="email"
            onChange={email.handleChange}
            value={email.value || ''}
            inputName="registerEmail"
            isDirty={email.isDirty}
            minLength="2"
            maxLength="30"
            errorMessage={email.inputError}
         />
         <InputOfUserForm
            id="inputRegisterPassword"
            labelName="Пароль"
            type="password"
            onChange={password.handleChange}
            value={password.value || ''}
            inputName="registerPassword"
            isDirty={password.isDirty}
            errorMessage={password.inputError}
         />
      </UserForm>
   );
}

export default Register;
