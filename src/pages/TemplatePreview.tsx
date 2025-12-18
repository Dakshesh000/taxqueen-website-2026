import SubPageLayout from "@/components/layout/SubPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Users, Shield, Clock } from "lucide-react";
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";

const TemplatePreview = () => {
  return (
    <SubPageLayout
      bannerImage={rvCoastalDrive}
      bannerAlt="RV driving along coastal highway"
      pageTitle="Template Preview"
    >
      <div className="space-y-16 pb-16">
        
        {/* 1. TEXT BLOCK SECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Text Block Section
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed">
            This is a standard text block for introductory content, descriptions, or any body copy. 
            It's left-aligned for better readability and follows the established typography system.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Secondary paragraphs can use muted foreground color to create visual hierarchy 
            while maintaining readability and consistency with the design system.
          </p>
        </section>

        {/* 2. IMAGE + TEXT ROW (Image Left) */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={womanWorkingViews} 
              alt="Digital nomad working with mountain views" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-wide">
              Image Left Layout
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              This layout places an image on the left with text content on the right. 
              Ideal for showcasing services, team members, or feature highlights with 
              supporting visuals.
            </p>
            <Button variant="cta">Get Started</Button>
          </div>
        </section>

        {/* 3. IMAGE + TEXT ROW (Image Right) */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 md:order-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-wide">
              Image Right Layout
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Alternating image placement creates visual rhythm and keeps content 
              engaging. This layout flips the image to the right side while keeping 
              text on the left.
            </p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Bullet point for key details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Another important feature</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden md:order-2">
            <img 
              src={workingAtBeach} 
              alt="Working remotely at the beach" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </section>

        {/* 4. FULL-WIDTH IMAGE */}
        <section className="space-y-2">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={heatherHikingNature} 
              alt="Heather hiking in nature" 
              className="w-full h-[250px] sm:h-[300px] object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Optional caption for the image — great for context or attribution.
          </p>
        </section>

        {/* 5. FEATURE GRID (3 columns) */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Feature Grid
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <FileText className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature One</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature Two</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature Three</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
          </div>
        </section>

        {/* 6. HIGHLIGHT CARD/BOX */}
        <section className="bg-muted/30 rounded-lg p-6 sm:p-8 border border-border space-y-4">
          <h3 className="text-xl font-semibold text-foreground uppercase">
            Highlight Box
          </h3>
          <p className="text-muted-foreground">
            Use this box style for callouts, important information, pricing details, 
            special offers, or any content that needs visual separation from the main flow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="cta">Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
          </div>
        </section>

        {/* 7. BULLET LIST SECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Bullet List Section
          </h2>
          <p className="text-muted-foreground">
            Introductory text before the list items:
          </p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>First bullet point with important information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Second bullet point highlighting another key aspect</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Third bullet point completing the list</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Fourth bullet point for additional detail</span>
            </li>
          </ul>
        </section>

        {/* 8. QUOTE/TESTIMONIAL BLOCK */}
        <section className="border-l-4 border-primary pl-6 py-4">
          <blockquote className="text-lg sm:text-xl italic text-foreground leading-relaxed">
            "This is a quote or testimonial block. Perfect for client feedback, 
            important statements, or highlighting key messages that deserve emphasis."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-4 block not-italic">
            — Client Name, Digital Nomad
          </cite>
        </section>

        {/* 9. TWO COLUMN GRID */}
        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground uppercase">
              Column One
            </h3>
            <p className="text-muted-foreground">
              Description for the first column item. Use for comparing options, 
              listing services side by side, or displaying related content.
            </p>
          </div>
          <div className="space-y-3">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground uppercase">
              Column Two
            </h3>
            <p className="text-muted-foreground">
              Description for the second column item. Maintains consistent spacing 
              and visual hierarchy with the first column.
            </p>
          </div>
        </section>

        {/* 10. IMAGE WITH OVERLAY TEXT */}
        <section className="relative rounded-lg overflow-hidden">
          <img 
            src={vanSnowMountains} 
            alt="Van in snowy mountains" 
            className="w-full h-[300px] sm:h-[350px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-2">
              Image with Overlay
            </h3>
            <p className="text-white/90 text-sm sm:text-base">
              Great for hero-style sections within pages or impactful visual statements.
            </p>
          </div>
        </section>

        {/* 11. CONTACT FORM SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Contact Form
          </h2>
          <p className="text-muted-foreground">
            Introductory text for the contact form section.
          </p>
          <form className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" rows={4} />
            </div>
            <Button variant="cta" type="submit">Send Message</Button>
          </form>
        </section>

        {/* 12. CTA SECTION */}
        <section className="pt-8 border-t border-border space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A closing call-to-action that encourages the visitor to take the next step.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="cta" size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </section>

      </div>
    </SubPageLayout>
  );
};

export default TemplatePreview;
