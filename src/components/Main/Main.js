import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import {
   ABOUT_ME,
   ABOUT_PROJECT,
   PORTFOLIO,
   TECHS,
} from '../../utils/constants';

function Main() {
   return (
      <>
         <main className="main">
            <Promo
               aboutProject={ABOUT_PROJECT}
               techs={TECHS}
               aboutMe={ABOUT_ME}
               portfolio={PORTFOLIO}
            />
            <AboutProject aboutProject={ABOUT_PROJECT} />
            <Techs techs={TECHS} />
            <AboutMe aboutMe={ABOUT_ME} portfolio={PORTFOLIO} />
         </main>
      </>
   );
}

export default Main;
