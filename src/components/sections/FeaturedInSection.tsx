import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const featuredMedia = [
  { name: "Drivin' & Vibin'", url: "https://drivinvibin.com/" },
  { name: "Rootless Living", url: "http://rootlessliving.com/" },
  { name: "Heath & Alyssa", url: "https://heathandalyssa.com/" },
  { name: "XSCAPERS", url: "https://www.escapees.com/" },
  { name: "Nervda", url: "https://nervda.com/" },
];

const FeaturedInSection = () => {
  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-8 font-medium">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {featuredMedia.map((media, index) => (
              <motion.a
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-2 text-lg lg:text-xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-300"
              >
                {media.name}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedInSection;
