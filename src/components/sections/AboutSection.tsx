import { useState } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { heatherPortrait, heatherInVan } from '@/assets';

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const credentials = [
    'Enrolled Agent (EA)',
    'Digital Nomad Since 2018',
    'Specialized in Expat & Nomad Taxes',
    '200+ Nomads Served',
  ];

  return (
    <>
      {/* Part 1: Circular Portrait with Video */}
      <section id="about" className="py-20 bg-section-teal">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Heading */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                Meet
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Heather
              </h2>
              <p className="text-lg text-muted-foreground">
                The Tax Queen
              </p>
            </div>

            {/* Circular Portrait with Play Button */}
            <div 
              className="relative cursor-pointer group"
              onClick={() => setIsVideoOpen(true)}
            >
              {/* Portrait Circle */}
              <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden shadow-lift-lg animate-float">
                <img 
                  src={heatherPortrait} 
                  alt="Heather - The Tax Queen"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
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

      {/* Part 2: Split-Screen Bio */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lift group">
              <img 
                src={heatherInVan} 
                alt="Heather working from her van"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Right: Bio Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                  Why Trust Me?
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  I've Walked in Your Shoes
                </h3>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I know the panic of realizing you owe taxes in multiple states. 
                  The confusion of "wait, do I even have a home base anymore?" 
                  The frustration of CPAs who just don't get the nomad lifestyle.
                </p>
                <p>
                  As a full-time digital nomad myself, I've navigated every tax 
                  curveball the road can throw at you. Now I help fellow nomads 
                  stay compliant, minimize their tax burden, and get back to 
                  what matters—living life on their own terms.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((credential, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {credential}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button variant="cta" size="lg" className="mt-4">
                Book a Free Consultation
              </Button>
            </div>
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
