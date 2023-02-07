import React from 'react';
import { Link } from 'react-router-dom';

function AccountLinkButton({ isLoggedIn, isButtonHidden }) {
   const hiddenClassName = `${
      isButtonHidden ? 'accountLinkButton_typeHeader_inactive' : ''
   }`;

   const headerAccountLinkClassName = `${hiddenClassName} ${
      isLoggedIn ? 'accountLinkButton' : 'accountLinkButton_inactive'
   }`;

   return (
      <Link to={'/profile'} className={headerAccountLinkClassName}>
         Аккаунт
      </Link>
   );
}

export default AccountLinkButton;
