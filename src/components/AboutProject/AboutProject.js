function AboutProject({ aboutProject }) {
   return (
      <section className="aboutProject" id={aboutProject}>
         <h2 className="aboutProject__title">О проекте</h2>
         <article className="aboutProject__textContainer">
            <h3 className="aboutProject__subtitle">
               Дипломный проект включал 5 этапов
            </h3>
            <h3 className="aboutProject__subtitle">
               На выполнение диплома ушло 5 недель
            </h3>
            <p className="aboutProject__paragraph">
               Составление плана, работу над бэкендом, вёрстку, добавление
               функциональности и финальные доработки.
            </p>
            <p className="aboutProject__paragraph">
               У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
               соблюдать, чтобы успешно защититься.
            </p>
         </article>
         <article className="aboutProject__imageContainer">
            <div className="aboutProject__image aboutProject__image_type_backEnd">
               1 неделя
            </div>
            <div className="aboutProject__image aboutProject__image_type_frontEnd">
               4 недели
            </div>
            <p className="aboutProject__imageSubtitle">Back-end</p>
            <p className="aboutProject__imageSubtitle">Front-end</p>
         </article>
      </section>
   );
}

export default AboutProject;
