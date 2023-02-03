import React from 'react';

function LinkPortfolio({ link, linkText, siteTitle }) {
   return (
      <a href={link} className="linkPortfolio" target="_blank">
         <span className="linkPortfolio__siteTitle">{siteTitle}&nbsp;</span>
         {linkText}
      </a>
   );
}

export default LinkPortfolio;
