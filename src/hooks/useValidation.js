import { useEffect, useState } from 'react';
import { regex } from '../utils/regex';

function useValidation() {
   const [isDirty, setIsDirty] = useState(true);
   const [inputError, setInputError] = useState('');
   const [inputValid, setInputValid] = useState(false);

   function validation(value) {
      if (!value.validity.valid) {
         setInputValid(false);
         setIsDirty(true);
         setInputError(value.validationMessage);
      } else {
         setInputValid(true);
         setIsDirty(false);
         setInputError('');
      }
   }

   console.log('validationRender');

   function nameInputValidation(inputData) {
      console.log(inputData);

      if (!regex.test(inputData)) {
         setInputValid(false);
         setIsDirty(true);
         setInputError('Вы ввели некорретные данные для имени');
      } else {
         setInputValid(true);
         setIsDirty(false);
         setInputError('');
      }
   }

   return {
      isDirty,
      inputError,
      inputValid,
      validation,
      setIsDirty,
      setInputValid,
      setInputError,
      nameInputValidation,
   };
}

export default useValidation;
