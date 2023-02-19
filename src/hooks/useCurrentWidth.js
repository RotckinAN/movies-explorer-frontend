import { useEffect, useState } from 'react';

function getWidth() {
   return document.documentElement.clientWidth;
}

function useCurrentWidth() {
   let [width, setWidth] = useState(getWidth());

   useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => setWidth(getWidth()), 200);
      };

      window.addEventListener('resize', resizeListener);

      return () => {
         window.removeEventListener('resize', resizeListener);
      };
   }, []);

   return width;
}

export default useCurrentWidth;
