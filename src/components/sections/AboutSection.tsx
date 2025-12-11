import { useState } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { heatherPortrait } from '@/assets';

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Credentials with random positioning and varied sizes
  const credentials = [
    { text: 'Enrolled Agent (EA)', top: '8%', left: '5%', size: 'text-sm' },
    { text: 'IRS Certified', top: '15%', right: '8%', size: 'text-base' },
    { text: '200+ Nomads Served', top: '25%', left: '2%', size: 'text-xs' },
    { text: 'Digital Nomad Since 2018', bottom: '30%', right: '3%', size: 'text-sm' },
    { text: 'Expat Tax Specialist', bottom: '15%', left: '8%', size: 'text-base' },
    { text: '50 States Covered', bottom: '8%', right: '12%', size: 'text-xs' },
    { text: 'Tax Consultant', top: '40%', left: '3%', size: 'text-lg' },
    { text: 'Enrolled Agent', bottom: '45%', right: '5%', size: 'text-xs' },
    { text: 'IRS Certified Tax Pro', top: '55%', right: '2%', size: 'text-sm' },
    { text: '200+ Clients', top: '70%', left: '5%', size: 'text-xs' },
    { text: 'Nomad Tax Expert', bottom: '55%', left: '1%', size: 'text-sm' },
    { text: 'Digital Nomad', top: '5%', left: '40%', size: 'text-xs' },
    { text: 'Tax Specialist', bottom: '5%', left: '35%', size: 'text-xs' },
  ];

  return (
    <>
      <section id="about" className="py-20 bg-background relative overflow-hidden group">
        {/* Scattered Credential Text - Hover Reveal */}
        {credentials.map((cred, index) => (
          <span
            key={index}
            className={`absolute ${cred.size} font-medium text-gray-200 group-hover:text-gray-400 transition-colors duration-500 pointer-events-none select-none`}
            style={{
              top: cred.top,
              bottom: cred.bottom,
              left: cred.left,
              right: cred.right,
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
