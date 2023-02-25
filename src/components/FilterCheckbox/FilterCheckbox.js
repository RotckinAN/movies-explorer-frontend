import React from 'react';

function FilterCheckbox({ id, checkedCheckBox, setCheckedCheckBox }) {
   function handleChange(evt) {
      setCheckedCheckBox(evt.target.checked);
   }

   return (
      <fieldset className="filterCheckbox">
         <label className="filterCheckbox__switch">
            <input
               type="checkbox"
               className="filterCheckbox__input"
               id={id}
               checked={checkedCheckBox}
               onChange={(evt) => handleChange(evt)}
            />
            <span className="filterCheckbox__slider"></span>
         </label>
         Короткометражки
      </fieldset>
   );
}

export default FilterCheckbox;
