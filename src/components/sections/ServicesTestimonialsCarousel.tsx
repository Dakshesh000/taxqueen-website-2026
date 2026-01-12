import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

// Testimonials with unique DiceBear avatars (different seeds than TestimonialsSection)
const testimonials = [
  {
    text: "Excellent service. Quick turnaround. Heather has surpassed any previous tax preparer with her customer service, and we will be back year after year for our tax preparation.",
    name: "Jon K.",
    role: "",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jonathan&backgroundColor=b6e3f4&skinColor=f5d0c5",
  },
  {
    text: "Taxes have been an enormous stressor since I moved to Portugal and this could not have been a more straightforward process. If there is a review I can write advocating for your services let me know!",
    name: "Catherine",
    role: "Expat",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Cathy&backgroundColor=ffd5dc&skinColor=eac393",
  },
  {
    text: "Heather has been our tax accountant for 11 years and has been consistently great to work with providing timely responses to all our questions and rapid processing of our tax returns.",
    name: "Mike M.",
    role: "11-Year Client",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael&backgroundColor=d1d4f9&skinColor=c68642",
  },
  {
    text: "I trust you and you know my taxes intimately. You have been the best thing to happen to me and my taxes and I wish I had worked with you from the beginning!",
    name: "Bina J.",
    role: "S-Corp",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=BinaJ&backgroundColor=c0aede&skinColor=f5d0c5",
  },
  {
    text: "You're the BEST! You are so prompt and super helpful (and patient!). Thank you!",
    name: "Sevilla",
    role: "",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sev&backgroundColor=b6e3f4&skinColor=8d5524",
  },
  {
    text: "I have been working with Heather for over 4 years now and she is as sharp as they come. The perfect fit for our needs. She helps us keep our books clean for tax time while helping me make critical business decisions.",
    name: "James W.",
    role: "Weatherproof Roofing",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=JamesW&backgroundColor=ffd5dc&skinColor=eac393",
  },
];

const ServicesTestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Auto-scroll every 8 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase mt-2">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto px-2 sm:px-0">
          {/* Navigation Buttons - Hidden on mobile, use swipe */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full bg-background shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full bg-background shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Single Testimonial Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="flex flex-col items-center text-center py-8">
                    {/* Avatar */}
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-primary/20"
                    />
                    
                    {/* Quote */}
                    <blockquote className="text-lg sm:text-xl md:text-2xl italic text-foreground leading-relaxed max-w-2xl mb-6">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Attribution */}
                    <cite className="not-italic">
                      <span className="font-bold text-foreground text-lg">
                        {testimonial.name}
                      </span>
                      {testimonial.role && (
                        <span className="text-muted-foreground"> — {testimonial.role}</span>
                      )}
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTestimonialsCarousel;