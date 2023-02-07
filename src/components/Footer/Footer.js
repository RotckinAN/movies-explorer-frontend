import React from 'react';

function Footer() {
   return (
      <footer className="footer">
         <p className="footer__text footer__text_type_paragraph">
            Учебный проект Яндекс.Практикум х BeatFilm.
         </p>
         <div className="footer__container">
            <p className="footer__text footer__text__type_date">
               © {new Date().getFullYear()}
            </p>
            <nav className="footer__linkContainer">
               <a
                  href="https://practicum.yandex.ru"
                  target="_blank"
                  className="footer__text footer__text_type_link"
               >
                  Яндекс.Практикум
               </a>
               <a
                  href="https://github.com/RotckinAN"
                  target="_blank"
                  className="footer__text footer__text_type_link"
               >
                  Github
               </a>
            </nav>
         </div>
      </footer>
   );
}

export default Footer;
