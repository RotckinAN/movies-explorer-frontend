import { useState } from 'react';
import useValidation from './useValidation';
import useLocalStorage from './useLocalStorage';

function useInput(initialValue) {
   const [value, setValue] = useState(initialValue);
   const [localStorageSearchMovieValue, setLocalStorageSearchMovieValue] =
      useLocalStorage('searchMovieInputValue', '');
   const [inputInFocus, setInputInFocus] = useState({});
   const {
      isDirty,
      inputError,
      inputValid,
      setInputValid,
      setInputError,
      inputValidation,
   } = useValidation();

   function handleChange(evt, pattern, textError) {
      setValue(evt.target.value);
      inputValidation(evt.target.value, pattern, textError);
   }

   function handleChangeToLocalStorage(evt, pattern, textError) {
      setLocalStorageSearchMovieValue(evt.target.value);
      inputValidation(evt.target.value, pattern, textError);
   }

   function onBlur(errorMessage, inputValue) {
      if (!inputValue) {
         setInputError(errorMessage);
         setInputValid(false);
      }
   }

   function onFocus(evt) {
      setInputInFocus(evt.target.name);
   }

   return {
      value,
      localStorageSearchMovieValue,
      setValue,
      setLocalStorageSearchMovieValue,
      isDirty,
      inputError,
      inputValid,
      setInputValid,
      handleChange,
      handleChangeToLocalStorage,
      onBlur,
      onFocus,
      inputInFocus,
      setInputInFocus,
   };
}

export default useInput;
