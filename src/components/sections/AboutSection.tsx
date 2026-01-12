import { useState, useRef, useCallback } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { heatherVideoThumbnail } from '@/assets';
import { useQuiz } from '@/contexts/QuizContext';

const AboutSection = () => {
  const { openQuiz } = useQuiz();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Credentials organized as linear rows
  const rows = [
    { texts: ['Enrolled Agent', 'IRS Certified', 'Tax Expert', 'Digital Nomad', 'Expat Specialist'], size: 'text-4xl' },
    { texts: ['200+ Nomads Served', 'Tax Consultant', '50 States Covered', 'Since 2018', 'Tax Pro'], size: 'text-3xl' },
    { texts: ['IRS Certified', 'Enrolled Agent', 'Digital Nomad', 'Tax Expert', '200+ Clients'], size: 'text-4xl' },
    { texts: ['Expat Tax', 'Nomad Expert', 'IRS Certified', 'Tax Consultant', 'Enrolled Agent'], size: 'text-3xl' },
    { texts: ['Tax Expert', 'Digital Nomad', '50 States', 'Enrolled Agent', 'IRS Certified'], size: 'text-4xl' },
    { texts: ['200+ Nomads', 'Tax Specialist', 'Expat Expert', 'Since 2018', 'Tax Pro'], size: 'text-3xl' },
    { texts: ['Enrolled Agent', 'IRS Certified', 'Tax Expert', 'Digital Nomad', 'Expat Specialist'], size: 'text-4xl' },
    { texts: ['Tax Consultant', '200+ Served', 'Nomad Tax', '50 States Covered', 'IRS Certified'], size: 'text-3xl' },
    { texts: ['Digital Nomad', 'Enrolled Agent', 'Tax Expert', 'IRS Certified', '200+ Clients'], size: 'text-4xl' },
    { texts: ['Expat Tax', 'Tax Pro', 'Nomad Expert', 'Enrolled Agent', 'Since 2018'], size: 'text-3xl' },
  ];

  // Throttled mouse move handler for performance
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
      rafRef.current = null;
    });
  }, []);

  const getOpacityFromPosition = (rowIndex: number, textIndex: number, totalTexts: number) => {
    if (!isHovering || !sectionRef.current) return 0.05;

    const rect = sectionRef.current.getBoundingClientRect();
    
    // Calculate approximate element position based on row and text index
    const rowHeight = rect.height / rows.length;
    const elementY = rowIndex * rowHeight + rowHeight / 2;
    const elementX = ((textIndex + 0.5) / totalTexts) * rect.width;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - elementX, 2) +
      Math.pow(mousePosition.y - elementY, 2)
    );

    const maxDistance = 180;
    if (distance > maxDistance) return 0.05;

    return 0.05 + (1 - distance / maxDistance) * 0.7;
  };

  return (
    <>
      <section 
        id="about" 
        ref={sectionRef}
        className="py-20 bg-background relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Credential Text Rows - Spotlight Reveal */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none select-none">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-around w-full">
              {row.texts.map((text, textIndex) => (
                <span
                  key={textIndex}
                  className={`${row.size} font-semibold whitespace-nowrap transition-opacity duration-150`}
                  style={{
                    color: `rgba(156, 163, 175, ${getOpacityFromPosition(rowIndex, textIndex, row.texts.length)})`,
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center space-y-10 relative z-10">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              Hi, I'm <span className="text-primary">Heather</span>
            </h2>

            {/* Tagline */}
            <p className="text-lg sm:text-xl xl:text-2xl text-foreground max-w-2xl mx-auto">
              Play the video to learn more about me!
            </p>

            {/* Circular Portrait with Bottom Play Bar */}
            <div 
              className="relative cursor-pointer group/video animate-float"
              onClick={() => setIsVideoOpen(true)}
            >
              {/* Portrait Circle */}
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] rounded-full overflow-hidden shadow-lift-lg">
                <img 
                  src={heatherVideoThumbnail} 
                  alt="Heather - The Tax Queen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Bottom Edge Play Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-foreground/70 to-transparent flex items-end justify-center pb-4 opacity-80 group-hover/video:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <Play className="w-4 h-4" fill="currentColor" />
                    <span className="text-sm font-medium">Watch</span>
                  </div>
                </div>
              </div>

              {/* Hover overlay for visual feedback */}
              <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover/video:bg-foreground/10 transition-all duration-300" />
            </div>

            {/* CTA Button */}
            <Button variant="cta" size="lg" onClick={() => openQuiz()}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Meet Heather - Your Tax Queen Video</DialogTitle>
          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/3HYAasPLc_s?autoplay=1&rel=0"
              title="Meet Heather - Your Tax Queen"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutSection;
