import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { 
  workingAtBeach, 
  rvTopView3, 
  rvCoastalDrive, 
  freedomNomad2 
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
  {
    title: "Tax Deductions Every Digital Nomad Should Know",
    excerpt: "Maximize your savings with these often-overlooked deductions for location-independent workers.",
    image: freedomNomad2,
  },
];

const BlogSection = () => {
  return (
    <section className="w-full py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 flex flex-col gap-14">
        {/* Header */}
        <div className="flex w-full justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground text-center">
            Tax Tips & Resources
          </h2>
        </div>

        {/* Blog Cards Carousel */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {blogPosts.map((post, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <article 
                  className="flex flex-col gap-3 group cursor-pointer h-full"
                >
                  <div className="rounded-lg overflow-hidden aspect-video mb-2 relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  {/* Read More Arrow */}
                  <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <CarouselPrevious className="left-0 -translate-x-1/2 md:-translate-x-full bg-muted/80 hover:bg-primary hover:text-primary-foreground border-none w-12 h-12">
            <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="right-0 translate-x-1/2 md:translate-x-full bg-muted/80 hover:bg-primary hover:text-primary-foreground border-none w-12 h-12">
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default BlogSection;
