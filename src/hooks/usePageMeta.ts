import { useEffect } from "react";

/**
 * Custom hook for managing page meta tags
 * Updates document title and meta description for SEO
 */
const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    // Update document title
    const previousTitle = document.title;
    document.title = title;

    // Update meta description if provided
    let previousDescription: string | null = null;
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        previousDescription = metaDescription.getAttribute("content");
        metaDescription.setAttribute("content", description);
      }
    }

    // Cleanup: restore previous values on unmount
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", previousDescription);
        }
      }
    };
  }, [title, description]);
};

export default usePageMeta;
