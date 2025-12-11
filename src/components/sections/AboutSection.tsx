import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { heatherPortrait } from '@/assets';

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

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

    return 0.05 + (1 - distance / maxDistance) * 0.5;
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
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Hi, I'm Heather, your Tax Queen
            </h2>

            {/* Circular Portrait with Play Button - Both Float Together */}
            <div 
              className="relative cursor-pointer group/video animate-float"
              onClick={() => setIsVideoOpen(true)}
            >
              {/* Portrait Circle */}
              <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden shadow-lift-lg">
                <img 
                  src={heatherPortrait} 
                  alt="Heather - The Tax Queen"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover/video:bg-foreground/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center transform scale-90 group-hover/video:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* CTA Text */}
            <p className="text-muted-foreground text-sm">
              Click to watch my story
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
          <video 
            src="/videos/heather-intro.mp4"
            controls
            autoPlay
            className="w-full h-auto"
            poster={heatherPortrait}
          >
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutSection;
