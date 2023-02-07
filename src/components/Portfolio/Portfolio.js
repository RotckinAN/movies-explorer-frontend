import React from 'react';
import LinkPortfolio from '../LinkPortfolio/LinkPortfolio';

function Portfolio({ portfolio }) {
   return (
      <article className="portfolio" id={portfolio}>
         <h3 className="portfolio__title">Портфолио</h3>
         <nav>
            <ul className="portfolio__linkList">
               <li className="portfolio__link">
                  <LinkPortfolio
                     link="https://rotckinan.github.io/how-to-learn/"
                     linkText="(статичный сайт)"
                     siteTitle="Научиться учиться"
                  />
               </li>
               <li className="portfolio__link">
                  <LinkPortfolio
                     link="https://rotckinan.github.io/russian-travel/"
                     linkText="(адаптивный сайт)"
                     siteTitle="Путешествия по России"
                  />
               </li>
               <li className="portfolio__link">
                  <LinkPortfolio
                     link="https://rotckinan.github.io/react-mesto-auth/"
                     linkText="(одностраничное приложение)"
                     siteTitle="Mesto Russia"
                  />
               </li>
            </ul>
         </nav>
      </article>
   );
}

export default Portfolio;
