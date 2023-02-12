import { useEffect, useState } from 'react';
import useValidation from './useValidation';
import { regex } from '../utils/regex';

function useInput() {
   const [value, setValue] = useState('');
   const {
      isDirty,
      inputError,
      inputValid,
      validation,
      setIsDirty,
      setInputValid,
      setInputError,
      nameInputValidation,
   } = useValidation();

   function handleChange(evt) {
      setValue(evt.target.value);
      validation(evt.target);
   }

   function handleChangeInputName(evt) {
      setValue(evt.target.value);
      // nameInputValidation(evt.target);
   }

   useEffect(() => {
      nameInputValidation(value);
   }, [value]);

   return {
      value,
      handleChange,
      setValue,
      isDirty,
      setIsDirty,
      inputError,
      setInputError,
      inputValid,
      setInputValid,
      handleChangeInputName,
   };
}

export default useInput;
