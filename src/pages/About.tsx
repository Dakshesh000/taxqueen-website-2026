import { useState } from "react";
import { motion } from "motion/react";
import { Play, Award, Shield, MapPin, BookOpen, Calculator, Users, Brain, HelpCircle, PhoneOff } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxDivider from "@/components/ui/ParallaxDivider";
import { useQuiz } from "@/contexts/QuizContext";
import {
  heatherVideoThumbnail,
  heatherInVan,
  rvMountainsBackground,
  freedomNomad,
  freedomNomad2,
  sunsetRvReflection,
  taxQueenInVan,
} from "@/assets";

const About = () => {
  const { openQuiz } = useQuiz();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const painPoints = [
    {
      icon: Brain,
      title: "Overwhelm & Anxiety",
      description: "Every time you even think about your taxes—especially because you're worried you'll make an expensive mistake",
    },
    {
      icon: HelpCircle,
      title: "Confusion About Structure",
      description: "Important designators like LLC and S corp, and concern that making the wrong choice will come back to bite you",
    },
    {
      icon: PhoneOff,
      title: "Crickets from Traditional Pros",
      description: "Sending urgent questions to your sticks-and-bricks tax professional and getting nothing but crickets (followed by an invoice)",
    },
  ];

  const credentials = [
    { icon: Award, label: "Enrolled Agent (EA)", desc: "Licensed to represent taxpayers before the IRS since 2014" },
    { icon: Calculator, label: "QuickBooks ProAdvisor", desc: "Extensively trained in accounting software solutions" },
    { icon: BookOpen, label: "NTPI Fellow", desc: "Advanced tax professional designation" },
    { icon: Shield, label: "Certified Tax Coach", desc: "Proactive tax planning, not just filing" },
    { icon: Users, label: "Gusto People Advisor", desc: "Payroll and HR tax expertise" },
    { icon: MapPin, label: "Full-Time Nomad", desc: "Living the lifestyle since 2016" },
  ];

  const featuredMedia = [
    { name: "Drivin' & Vibin'", url: "https://drivinvibin.com/" },
    { name: "Rootless Living", url: "http://rootlessliving.com/" },
    { name: "Heath & Alyssa", url: "https://heathandalyssa.com/" },
    { name: "XSCAPERS", url: "https://www.escapees.com/" },
    { name: "Nervda", url: "https://nervda.com/" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Section 1: Hero Banner */}
      <section className="pt-24 lg:pt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
            <img
              src={taxQueenInVan}
              alt="Heather - The Tax Queen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/50" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-2">
                Taxes Make You Lose Sleep?
              </h1>
              <p className="text-xl md:text-2xl font-medium">
                I'm here for you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Personal Intro + Video */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div
                className="relative cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                {/* Portrait Circle */}
                <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden shadow-2xl">
                  <img
                    src={heatherVideoThumbnail}
                    alt="Heather - The Tax Queen"
                    className="w-full h-full object-cover"
                  />
                  {/* Bottom Edge Play Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-foreground/70 to-transparent flex items-end justify-center pb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white">
                      <Play className="w-4 h-4" fill="currentColor" />
                      <span className="text-sm font-medium">Watch</span>
                    </div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-primary font-medium uppercase tracking-widest text-sm">Meet Your Tax Strategist</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
                Hi, I'm Heather
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a numbers person—but don't let that scare you. I won't be tossing any jargon your way, so if the phrase "capital gains" makes you go "huh?"—don't worry. You're in a safe space.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Just like you, I built my own business from the ground up, so I know firsthand how tough it can be. And with 8 years of experience working with nomadic solopreneurs, entrepreneurs, and small business owners just like you, I know exactly what keeps you awake at night.
              </p>
              <Button size="lg" className="mt-4" onClick={() => openQuiz()}>
                Let's Work Together
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: "I Get It" Pain Points */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground uppercase">
              I Know Exactly What Keeps You Awake at Night
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <point.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-3">{point.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: My Story - Tabbed Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">My Journey</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              The Story Behind The Tax Queen
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="beginning" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
                <TabsTrigger value="beginning" className="py-3 text-sm sm:text-base">The Beginning</TabsTrigger>
                <TabsTrigger value="discovery" className="py-3 text-sm sm:text-base">The Discovery</TabsTrigger>
                <TabsTrigger value="today" className="py-3 text-sm sm:text-base">Today</TabsTrigger>
              </TabsList>

              <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-sm">
                <TabsContent value="beginning" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/3">
                      <img
                        src={heatherInVan}
                        alt="Heather's early days"
                        className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">From Bakery Owner to Tax Pro</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        I wasn't always the Tax Queen. In my pre-nomadic life, I owned a custom-order bakery. I remember all too well how hard it was to run the creative and financial sides of my business: figuring out how to correctly register the business (all those licenses), track expenses, pay vendors, and even pay myself!
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I made countless mistakes, and that's when I found my true calling: helping other business owners do better. I became an enrolled agent in 2014, and the rest is history. (Though I still make a darn good cupcake.)
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discovery" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/3">
                      <img
                        src={freedomNomad}
                        alt="Life on the road"
                        className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Hitting the Road</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        In 2016, my husband and I made a life-changing decision. We moved ourselves and our two dogs into an RV and hit the road. That first tax season as a nomad? It was a nightmare. I quickly discovered that most tax professionals had no idea how to handle someone with no permanent address.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Other nomads started asking for help. First a few friends, then friends of friends. I realized there was a massive gap—thousands of people living alternative lifestyles with no one who truly understood their unique tax situation.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="today" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/3">
                      <img
                        src={rvMountainsBackground}
                        alt="Life today"
                        className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Living & Working on My Terms</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Since 2016, my husband and I have traveled all over North America in our RV with our two dogs, enjoying our favorite hobbies: walking up mountains, sampling local cuisine, and taste-testing microbrews.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Today, I help digital nomads, RVers, remote workers, and location-independent entrepreneurs save money, stay compliant, and build wealth—all while living life on their own terms. I'm not just your tax strategist—I'm proof that this lifestyle works.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Parallax Divider */}
      <ParallaxDivider
        image={rvMountainsBackground}
        text="My Mission"
        subtext="Helping you keep more of what you earn—so you can live more of the life you love"
      />

      {/* Section 6: Credentials Deep Dive */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Qualifications</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
              My Background is Extensive
            </h2>
            <p className="text-xl text-muted-foreground mt-4">Just Like My Travels</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <cred.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{cred.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cred.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: "I See You" Empathy Block */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-primary font-medium uppercase tracking-widest text-sm">Why Work With Me?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
                Because, Digital Nomad—I See You.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I've dedicated my nomadic business to helping other adventure-seekers like you run the tax side of their business without confusion, worry, or fear. I know exactly what it takes to run a business from the road, because I'm doing it, too!
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I've got years of experience handling the toughest tax situations nomadic entrepreneurs could throw at me. As an enrolled agent, I can deal with the IRS on your behalf, stepping in whenever you need a helping hand.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                And if you ever do feel confused or overwhelmed, I'm just a phone call or an email away.
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={freedomNomad2}
                  alt="Life on the road"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Featured On */}
      <section className="py-16 border-y border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-8">
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
                  className="text-lg lg:text-xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-300"
                >
                  {media.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9: CTA Section with Background Image */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src={sunsetRvReflection}
            alt="RV at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase">
              Ready to Take Control of Your Taxes?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Whether you need help with tax preparation, want a comprehensive strategy session, or just have questions about nomad taxes—I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" onClick={() => openQuiz()}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                <a href="/services">Explore Services</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Meet Heather - Your Tax Queen Video</DialogTitle>
          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/3HYAasPLc_s?autoplay=1&rel=0"
              title="Meet Heather - Your Tax Queen"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default About;
