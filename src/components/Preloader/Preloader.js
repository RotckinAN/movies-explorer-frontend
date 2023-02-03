function Preloader({ isOpen }) {
   const preloaderClassName = `preloader ${isOpen ? 'preloader_active' : ''}`;

   return (
      <div className={preloaderClassName}>
         <div className="preloader__container">
            <span className="preloader__round"></span>
         </div>
      </div>
   );
}

export default Preloader;
