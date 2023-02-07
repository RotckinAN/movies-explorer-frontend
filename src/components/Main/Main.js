// import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
// import Footer from '../Footer/Footer';
import { aboutMe, aboutProject, portfolio, techs } from '../../utils/constants';

function Main() {
   return (
      <>
         {/*хэдер для теста */}
         {/*<Header isLoggedIn={false} />*/}
         <main className="main">
            <Promo
               aboutProject={aboutProject}
               techs={techs}
               aboutMe={aboutMe}
               portfolio={portfolio}
            />
            <AboutProject aboutProject={aboutProject} />
            <Techs techs={techs} />
            <AboutMe aboutMe={aboutMe} portfolio={portfolio} />
         </main>
         {/*<Footer />*/}
      </>
   );
}

export default Main;
