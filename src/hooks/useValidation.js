import { useState } from 'react';

function useValidation() {
   const [isDirty, setIsDirty] = useState(false);
   const [inputError, setInputError] = useState('');
   const [inputValid, setInputValid] = useState(false);

   function inputValidation(inputData, pattern, textError) {
      if (!pattern.test(inputData)) {
         setInputValid(false);
         setIsDirty(true);
         setInputError(textError);
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
      setInputValid,
      setInputError,
      inputValidation,
   };
}

export default useValidation;
