import NavTab from '../NavTab/NavTab';

function Promo({ aboutProject, techs, aboutMe, portfolio }) {
   return (
      <section className="promo">
         <div className="promo__mainContainer">
            <div className="promo__textContainer">
               <h1 className="promo__title">
                  Учебный проект студента факультета Веб&#8209;разработки.
               </h1>
               <p className="promo__subTitle">
                  Листайте ниже, чтобы узнать больше про этот проект и его
                  создателя.
               </p>
            </div>
            <div className="promo__mainImage"></div>
         </div>
         <NavTab
            aboutProject={aboutProject}
            techs={techs}
            aboutMe={aboutMe}
            portfolio={portfolio}
         />
      </section>
   );
}

export default Promo;
