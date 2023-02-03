import React from 'react';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe({ aboutMe, portfolio }) {
   return (
      <section className="aboutMe" id={aboutMe}>
         <h2 className="aboutMe__title">Студент</h2>
         <article className="aboutMe__mainContainer">
            <div className="aboutMe__textContainer">
               <div className="aboutMe__text">
                  <h3 className="aboutMe__subtitle">Анатолий</h3>
                  <p className="aboutMe__topParagraph">
                     Фронтенд-разработчик, {new Date().getFullYear() - 1986}
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
