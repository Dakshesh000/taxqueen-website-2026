import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const featuredMedia = [
  { name: "Drivin' & Vibin'", url: "https://drivinvibin.com/" },
  { name: "Rootless Living", url: "http://rootlessliving.com/" },
  { name: "Heath & Alyssa", url: "https://heathandalyssa.com/" },
  { name: "XSCAPERS", url: "https://www.escapees.com/" },
  { name: "Nervda", url: "https://nervda.com/" },
];

const MediaLink = ({ media, index }: { media: typeof featuredMedia[0]; index: number }) => (
  <motion.a
    href={media.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group flex items-center gap-2 text-base sm:text-lg lg:text-xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-300 whitespace-nowrap flex-shrink-0"
  >
    {media.name}
    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.a>
);

const FeaturedInSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-6 sm:mb-8 font-medium">
            As Featured In
          </p>
          
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 w-max justify-start pb-2">
              {featuredMedia.map((media, index) => (
                <MediaLink key={media.name} media={media} index={index} />
              ))}
            </div>
          </div>
          
          {/* Desktop: Flex wrap centered */}
          <div className="hidden md:flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {featuredMedia.map((media, index) => (
              <MediaLink key={media.name} media={media} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedInSection;
