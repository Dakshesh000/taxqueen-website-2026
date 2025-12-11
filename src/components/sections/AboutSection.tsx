import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { heatherPortrait } from '@/assets';

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Credentials with positioning - fills the entire container
  const credentials = [
    // Top row
    { text: 'Enrolled Agent', top: '5%', left: '3%', size: 'text-3xl' },
    { text: 'IRS Certified', top: '8%', left: '25%', size: 'text-4xl' },
    { text: 'Tax Expert', top: '3%', left: '55%', size: 'text-3xl' },
    { text: 'Digital Nomad', top: '10%', left: '78%', size: 'text-4xl' },
    // Upper middle
    { text: '200+ Nomads Served', top: '18%', left: '5%', size: 'text-4xl' },
    { text: 'Tax Consultant', top: '22%', left: '40%', size: 'text-3xl' },
    { text: 'Expat Specialist', top: '15%', left: '70%', size: 'text-3xl' },
    // Middle rows (around portrait)
    { text: 'IRS Certified', top: '30%', left: '2%', size: 'text-3xl' },
    { text: 'Enrolled Agent', top: '35%', left: '18%', size: 'text-4xl' },
    { text: '50 States', top: '32%', left: '72%', size: 'text-4xl' },
    { text: 'Tax Expert', top: '38%', left: '85%', size: 'text-3xl' },
    { text: 'Digital Nomad', top: '45%', left: '3%', size: 'text-4xl' },
    { text: 'Since 2018', top: '48%', left: '80%', size: 'text-3xl' },
    { text: '200+ Clients', top: '52%', left: '5%', size: 'text-3xl' },
    { text: 'Tax Specialist', top: '55%', left: '78%', size: 'text-4xl' },
    // Lower middle
    { text: 'Nomad Expert', top: '62%', left: '2%', size: 'text-4xl' },
    { text: 'IRS Certified', top: '65%', left: '75%', size: 'text-3xl' },
    { text: 'Enrolled Agent', top: '68%', left: '15%', size: 'text-3xl' },
    { text: 'Tax Pro', top: '70%', left: '82%', size: 'text-4xl' },
    // Bottom rows
    { text: 'Digital Nomad', top: '78%', left: '5%', size: 'text-3xl' },
    { text: '200+ Served', top: '82%', left: '30%', size: 'text-4xl' },
    { text: 'Tax Expert', top: '75%', left: '60%', size: 'text-3xl' },
    { text: 'Enrolled Agent', top: '80%', left: '80%', size: 'text-4xl' },
    { text: 'IRS Certified', top: '88%', left: '8%', size: 'text-4xl' },
    { text: 'Expat Tax', top: '90%', left: '45%', size: 'text-3xl' },
    { text: '50 States Covered', top: '85%', left: '70%', size: 'text-3xl' },
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

  const getOpacity = (topPercent: string, leftPercent: string) => {
    if (!isHovering || !sectionRef.current) return 0.05; // Almost invisible

    const rect = sectionRef.current.getBoundingClientRect();
    const elementX = (parseFloat(topPercent) / 100) * rect.width;
    const elementY = (parseFloat(leftPercent) / 100) * rect.height;
    
    // Swap X and Y since top% affects Y position and left% affects X position
    const actualX = (parseFloat(leftPercent) / 100) * rect.width;
    const actualY = (parseFloat(topPercent) / 100) * rect.height;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - actualX, 2) +
      Math.pow(mousePosition.y - actualY, 2)
    );

    const maxDistance = 180; // Spotlight radius in pixels
    if (distance > maxDistance) return 0.05;

    // Closer = higher opacity (max 0.45 for medium gray, not black)
    return 0.05 + (1 - distance / maxDistance) * 0.4;
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
        {/* Scattered Credential Text - Spotlight Reveal */}
        {credentials.map((cred, index) => (
          <span
            key={index}
            className={`absolute ${cred.size} font-semibold pointer-events-none select-none transition-opacity duration-150`}
            style={{
              top: cred.top,
              left: cred.left,
              color: `rgba(156, 163, 175, ${getOpacity(cred.top, cred.left)})`, // gray-400 base
            }}
          >
            {cred.text}
          </span>
        ))}

        <div className="container mx-auto px-4">
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
