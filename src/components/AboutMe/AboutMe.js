import React from 'react';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe({ aboutMe, portfolio }) {
   const fullAge = new Date().getFullYear() - 1986;
   let years = '';
   const lastNumber = Number(fullAge.toString()[fullAge.toString().length - 1]);
   if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
      years = 'года';
   } else if (lastNumber === 1) years = 'год';
   else {
      years = 'лет';
   }

   return (
      <section className="aboutMe" id={aboutMe}>
         <h2 className="aboutMe__title">Студент</h2>
         <article className="aboutMe__mainContainer">
            <div className="aboutMe__textContainer">
               <div className="aboutMe__text">
                  <h3 className="aboutMe__subtitle">Анатолий</h3>
                  <p className="aboutMe__topParagraph">
                     Фронтенд-разработчик, {fullAge} {years}
                  </p>
                  <p className="aboutMe__paragraph">
                     Я родился и живу в Калининграде, закончил строительный
                     факультет КГТУ. С детства увлекаюсь компьютерами, но судьба
                     сложилась так, что я не пошел учиться по данной
                     специальности. Недавно начал кодить. С 2005 года работал в
                     различных компаниях, занимающихся изготовлением проектной
                     документации. После того, как прошёл курс по
                     веб-разработке, ушёл с постоянной работы.
                  </p>
               </div>
               <a
                  href="https://github.com/RotckinAN"
                  target="_blank"
                  className="aboutMe__myLink"
               >
                  Github
               </a>
            </div>
            <img
               src={require('../../images/photo.jpg')}
               alt="My photo"
               className="aboutMe__myPhoto"
            />
         </article>
         <Portfolio portfolio={portfolio} />
      </section>
   );
}

export default AboutMe;
