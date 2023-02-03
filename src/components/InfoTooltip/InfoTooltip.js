function InfoTooltip({ loggedIn, name, isOpen, onClose, infoText }) {
   const popupConfirmImage = `popup__image ${
      loggedIn
         ? 'popup__image_type_successImage'
         : 'popup__image_type_failImage'
   }`;

   return (
      <div
         className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
         // className={`popup popup_type_${name} `}
      >
         <div className="popup__container">
            <button
               className="popup__close"
               type="button"
               onClick={onClose}
            ></button>
            <div className={`popup__content popup__content_type_${name}`}>
               <div className={popupConfirmImage}></div>
               <h2 className="popup__content-title popup__content-title_type_confirmPopup">
                  {infoText}
               </h2>
            </div>
         </div>
      </div>
   );
}

export default InfoTooltip;
