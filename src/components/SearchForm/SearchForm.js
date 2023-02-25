import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
   id,
   onChange,
   onBlur,
   value,
   inputName,
   isMovieSearchInvalid,
   setIsMovieSearchInvalid,
   errorMessage,
   name,
   onSubmit,
   isFormValid,
   checkedCheckBox,
   setCheckedCheckBox,
}) {
   const errorMessageClassName = `searchForm__input-error ${
      isMovieSearchInvalid ? 'searchForm__input-error_active' : ''
   }`;
   const buttonClassName = `searchForm__searchButton ${
      isFormValid ? '' : 'searchForm__searchButton_invalid'
   }`;

   function handleOnBlur(evt) {
      onBlur();

      if (!evt.target.value) {
         setIsMovieSearchInvalid(true);
      } else {
         setIsMovieSearchInvalid(false);
      }
   }

   return (
      <section className="searchForm">
         <form
            className="searchForm__form"
            onSubmit={onSubmit}
            name={`${name}Form`}
            noValidate
         >
            <div className="searchForm__searchImage"></div>
            <label className="searchForm__itemContainer" htmlFor={id}>
               <input
                  type="text"
                  className="searchForm__item"
                  onChange={onChange}
                  onBlur={(evt) => handleOnBlur(evt)}
                  value={value}
                  name={inputName}
                  autoComplete="off"
                  id={id}
                  required
                  placeholder="Фильм"
               />
            </label>
            <button
               type="submit"
               value="Найти"
               aria-label={name}
               className={buttonClassName}
               id={`${name}-searchButton`}
               disabled={!isFormValid}
            >
               Найти
            </button>
            <span className={errorMessageClassName}>{errorMessage}</span>
         </form>
         <FilterCheckbox
            id="searchMovieFilter"
            checkedCheckBox={checkedCheckBox}
            setCheckedCheckBox={setCheckedCheckBox}
         />
      </section>
   );
}

export default SearchForm;
