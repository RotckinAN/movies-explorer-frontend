import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
   onSubmit,
   name,
   onChange,
   value,
   inputName,
   id,
   errorMessage,
   isDirty,
}) {
   const errorMessageClassName = `searchForm__input-error ${
      isDirty ? 'searchForm__input-error_active' : ''
   }`;

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
               className="searchForm__searchButton"
               id={`${name}-searchButton`}
            >
               Найти
            </button>
            <span className={errorMessageClassName}>{errorMessage}</span>
         </form>
         <FilterCheckbox id="searchMovieFilter" />
      </section>
   );
}

export default SearchForm;
