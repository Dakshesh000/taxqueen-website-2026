import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import InlineVideoPlayer from '@/components/ui/InlineVideoPlayer';
import { heatherVideoThumbnail } from '@/assets';
import { useQuiz } from '@/contexts/QuizContext';

const AboutSection = () => {
  const { openQuiz } = useQuiz();
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

          {/* Circular Video Player */}
          <div className="animate-float">
            <InlineVideoPlayer
              thumbnail={heatherVideoThumbnail}
              videoSrc="/videos/heather-intro.mp4"
              alt="Heather - The Tax Queen"
              className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] rounded-full shadow-lift-lg"
              aspectRatio="square"
            />
          </div>

          {/* CTA Button */}
          <Button variant="cta" size="lg" onClick={() => openQuiz()}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
