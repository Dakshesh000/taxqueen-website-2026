import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  workingAtBeach, 
  rvTopView3, 
  rvCoastalDrive 
} from "@/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogPosts = [
  {
    title: "LLC vs S-Corp: Which is Right for Digital Nomads?",
    excerpt: "Understanding the key differences between business structures and how they impact your tax liability as a nomad.",
    image: workingAtBeach,
  },
  {
    title: "State Residency for Full-Time RVers: A Complete Guide",
    excerpt: "Everything you need to know about choosing a domicile state when your home is on wheels.",
    image: rvTopView3,
  },
  {
    title: "Quarterly Tax Payments: Don't Get Caught Off Guard",
    excerpt: "How to calculate and stay on top of your estimated tax payments as a self-employed nomad.",
    image: rvCoastalDrive,
  },
];

const BlogSection = () => {
  return (
    <section id="articles" className="w-full py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 flex flex-col gap-14">
        {/* Blog Cards Carousel - Header inside for mobile arrow access */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          {/* Header with Mobile Navigation */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground text-center">
              Tax Tips & Resources
            </h2>
            
            {/* Mobile Navigation - Below heading */}
            <div className="flex md:hidden justify-center gap-4">
              <CarouselPrevious className="relative static translate-x-0 translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none w-10 h-10 shadow-md">
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="relative static translate-x-0 translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none w-10 h-10 shadow-md">
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {blogPosts.map((post, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="flex flex-col gap-3 h-full">
                  <div className="rounded-lg overflow-hidden aspect-video mb-2 relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  <span className="text-primary font-medium text-sm mt-auto">
                    Coming Soon
                  </span>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Desktop Navigation Arrows */}
          <CarouselPrevious className="hidden md:flex left-0 -translate-x-14 top-[14%] -translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none w-12 h-12 shadow-lg">
            <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="hidden md:flex right-0 translate-x-14 top-[14%] -translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none w-12 h-12 shadow-lg">
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default BlogSection;
