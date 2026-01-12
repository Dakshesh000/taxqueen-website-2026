import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineVideoPlayerProps {
  thumbnail: string;
  videoSrc: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square";
}

const InlineVideoPlayer = ({ 
  thumbnail, 
  videoSrc, 
  alt, 
  className,
  aspectRatio = "video" 
}: InlineVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Small delay to ensure video element is visible before playing
    setTimeout(() => {
      videoRef.current?.play();
    }, 50);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Thumbnail Layer - visible when not playing, captures all clicks */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-300 cursor-pointer group z-10",
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={handlePlay}
      >
        <img 
          src={thumbnail} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        
        {/* Bottom Edge Play Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-foreground/70 to-transparent flex items-end justify-center pb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-white">
            <Play className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-medium">Watch</span>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />
      </div>

      {/* Video Layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        controls
        onEnded={handleVideoEnd}
        playsInline
        preload="metadata"
      />
    </div>
  );
};

export default InlineVideoPlayer;
