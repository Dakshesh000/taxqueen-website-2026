/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component that:
 * - Adds explicit width/height to prevent CLS (Cumulative Layout Shift)
 * - Supports lazy loading for below-fold images
 * - Supports LQIP (Low Quality Image Placeholder) for smooth loading
 * - Handles loading states gracefully
 * 
 * @example
 * // Basic usage
 * <OptimizedImage
 *   src={heroImage}
 *   alt="Hero banner"
 *   width={1200}
 *   height={800}
 * />
 * 
 * @example
 * // With LQIP placeholder
 * <OptimizedImage
 *   src={heroImage}
 *   alt="Hero banner"
 *   width={1200}
 *   height={800}
 *   placeholder={heroPlaceholder}
 * />
 * 
 * @example
 * // Priority loading (above-fold)
 * <OptimizedImage
 *   src={heroImage}
 *   alt="Hero banner"
 *   width={1200}
 *   height={800}
 *   priority
 * />
 */

import { useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  /** Image source URL or imported image */
  src: string;
  /** Alt text for accessibility - required */
  alt: string;
  /** Intrinsic width of the image in pixels */
  width: number;
  /** Intrinsic height of the image in pixels */
  height: number;
  /** If true, loads immediately (use for above-fold images) */
  priority?: boolean;
  /** Base64 LQIP placeholder for blur-up effect */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Object-fit property */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Object-position property */
  objectPosition?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder,
  className,
  objectFit = "cover",
  objectPosition = "center",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Calculate aspect ratio for responsive sizing
  const aspectRatio = width / height;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      {/* LQIP Placeholder - shown while main image loads */}
      {placeholder && !isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full blur-lg scale-110"
          style={{
            objectFit,
            objectPosition,
          }}
        />
      )}

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          placeholder && !isLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          objectFit,
          objectPosition,
        }}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;
