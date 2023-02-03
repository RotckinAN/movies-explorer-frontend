import React from 'react';
import LinkPortfolio from '../LinkPortfolio/LinkPortfolio';

function Portfolio({ portfolio }) {
   return (
      <article className="portfolio" id={portfolio}>
         <h3 className="portfolio__title">Портфолио</h3>
         <nav className="portfolio__linkList">
            <LinkPortfolio
               link="https://rotckinan.github.io/how-to-learn/"
               linkText="(статичный сайт)"
               siteTitle="Научиться учиться"
            />
            <LinkPortfolio
               link="https://rotckinan.github.io/russian-travel/"
               linkText="(адаптивный сайт)"
               siteTitle="Путешествия по России"
            />
            <LinkPortfolio
               link="https://rotckinan.github.io/react-mesto-auth/"
               linkText="(одностраничное приложение)"
               siteTitle="Mesto Russia"
            />
         </nav>
      </article>
   );
}

export default Portfolio;
