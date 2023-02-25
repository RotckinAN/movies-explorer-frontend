function InputOfUserForm({
   id,
   labelName,
   type,
   onChange,
   onBlur,
   value,
   inputName,
   isDirty,
   errorMessage,
}) {
   const inputClassName = `inputOfUserForm__item inputOfUserForm__item_inputType_${inputName} ${
      isDirty ? 'inputOfUserForm__item_type_error' : ''
   }`;
   const errorMessageClassName = `inputOfUserForm__input-error ${
      isDirty ? 'inputOfUserForm__input-error_active' : ''
   }`;

   return (
      <label
         htmlFor={id}
         className="inputOfUserForm inputOfUserForm__inputTitle"
      >
         {labelName}
         <input
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={inputName}
            className={inputClassName}
            autoComplete="off"
            id={id}
            required
         />
         <span className={errorMessageClassName}>{errorMessage}</span>
      </label>
   );
}

export default InputOfUserForm;
