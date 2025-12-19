import { useState, useEffect } from "react";

/**
 * Custom hook to preload images before rendering
 * Returns true when all images are loaded and cached
 */
const useImagePreloader = (imageSources: string[]): boolean => {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (imageSources.length === 0) {
      setAllLoaded(true);
      return;
    }

    let isMounted = true;

    const preloadImages = async () => {
      const promises = imageSources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Don't block on errors
          })
      );

      await Promise.all(promises);
      
      if (isMounted) {
        setAllLoaded(true);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageSources]);

  return allLoaded;
};

export default useImagePreloader;
