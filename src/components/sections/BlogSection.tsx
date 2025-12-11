import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  workingAtBeach, 
  rvTopView3, 
  rvCoastalDrive, 
  freedomNomad2 
} from "@/assets";

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

const BlogSection = () => (
  <section className="w-full py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 flex flex-col gap-14">
      {/* Header */}
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground">
          Tax Tips & Resources
        </h2>
        <Button variant="cta" className="gap-3">
          View All Resources <MoveRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogPosts.map((post, index) => (
          <article 
            key={index}
            className="flex flex-col gap-3 hover:opacity-80 cursor-pointer transition-opacity duration-300"
          >
            <div className="rounded-lg overflow-hidden aspect-video mb-2">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
