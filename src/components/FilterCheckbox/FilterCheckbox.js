import React from 'react';

function FilterCheckbox({ id }) {
   return (
      <fieldset className="filterCheckbox">
         <label className="filterCheckbox__switch">
            <input
               type="checkbox"
               className="filterCheckbox__input"
               id={id}
               // onChange={(evt) => console.log(evt.target.checked)}
            />
            <span className="filterCheckbox__slider"></span>
         </label>
         Короткометражки
      </fieldset>
   );
}

export default FilterCheckbox;
