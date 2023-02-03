import { Link } from 'react-router-dom';

function UserForm({
   name,
   title,
   children,
   buttonText,
   isFormValid,
   onSubmit,
   additionalText,
   link,
   linkText,
   typeClassName,
}) {
   const buttonClassName = `userFrom__saveButton userFrom__saveButton_type_${typeClassName} ${
      isFormValid ? '' : 'userForm__saveButton_invalid'
   }`;

   return (
      <main className="userForm">
         <Link to={'/'} className="userForm__logo"></Link>
         <h1 className="userForm__title">{title}</h1>
         <form
            className="userForm__content"
            onSubmit={onSubmit}
            name={`${name}Form`}
            noValidate
         >
            {children}
            <button
               type="submit"
               value={buttonText}
               className={buttonClassName}
               id={`${name}-saveButton`}
               disabled={!isFormValid}
            >
               {buttonText}
            </button>
         </form>
         <div className="userForm__additionalTextContainer">
            <p className="userForm__additionalText">{additionalText}</p>
            <Link to={link} className="userForm__linkText">
               {linkText}
            </Link>
         </div>
      </main>
   );
}

export default UserForm;
