import React from 'react';

function Techs({ techs }) {
   return (
      <section className="techs" id={techs}>
         <h2 className="techs__title">Технологии</h2>
         <article className="techs__container">
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__paragraph">
               На курсе веб-разработки мы освоили технологии, которые применили
               в дипломном проекте.
            </p>
            <ul className="techs__techsContainer">
               <li className="techs__technology">HTML</li>
               <li className="techs__technology">CSS</li>
               <li className="techs__technology">JS</li>
               <li className="techs__technology">React</li>
               <li className="techs__technology">Git</li>
               <li className="techs__technology">Express.js</li>
               <li className="techs__technology">mongoDB</li>
            </ul>
         </article>
      </section>
   );
}

export default Techs;
