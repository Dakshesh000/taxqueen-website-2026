import { motion } from "motion/react";
import { Award, Shield, MapPin, BookOpen, Calculator, Users, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxDivider from "@/components/ui/ParallaxDivider";
import InlineVideoPlayer from "@/components/ui/InlineVideoPlayer";
import { useQuiz } from "@/contexts/QuizContext";
import usePageMeta from "@/hooks/usePageMeta";
import {
  heatherVideoThumbnail,
  heatherAboutHero,
  heatherStoryTab1,
  heatherStoryTab2,
  heatherStoryTab3,
  heatherMission,
  heatherWhyWorkWithMe,
  heatherAboutCta,
} from "@/assets";
import useImagePreloader from "@/hooks/useImagePreloader";

// Preload tab images for instant switching
const TAB_IMAGES = [heatherStoryTab1, heatherStoryTab2, heatherStoryTab3];

const About = () => {
  const { openQuiz } = useQuiz();
  // Set page meta for SEO
  usePageMeta(
    "About Heather | Tax Queen - Nomad Tax Specialist",
    "Meet Heather, an Enrolled Agent and Certified Tax Coach who has been helping digital nomads with their taxes since 2014."
  );
  
  // Preload tab images for instant switching
  useImagePreloader(TAB_IMAGES);

  const credentialsStrip = [
    { icon: Shield, label: "Enrolled Agent (EA)" },
    { icon: Calendar, label: "EA Since 2014" },
    { icon: Award, label: "Certified Tax Coach" },
    { icon: MapPin, label: "Full-Time Nomad Since 2016" },
  ];

  const credentials = [
    { icon: Award, label: "Enrolled Agent (EA)", desc: "Licensed to represent taxpayers before the IRS since 2014" },
    { icon: Shield, label: "Certified Tax Coach", desc: "Proactive tax planning, not just filing" },
    { icon: BookOpen, label: "NTPI Fellow", desc: "Advanced tax professional designation" },
    { icon: Users, label: "Gusto People Advisor", desc: "Payroll and HR tax expertise" },
    { icon: Calculator, label: "QuickBooks ProAdvisor", desc: "Extensively trained in accounting software solutions" },
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
      <main id="main-content" className="flex-1">
        {/* Section 1: Hero Banner */}
      <section className="pt-24 lg:pt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
            <img
              src={heatherAboutHero}
              alt="Two women smiling at laptop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/50" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
                Taxes Make You Lose Sleep?
                <br />
                I'm here for you!
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Personal Intro + Video */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto">
            {/* Left: Video Thumbnail - Rectangular, matches height of right column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center h-full"
            >
              <div className="w-full max-w-md lg:max-w-none h-full">
                <InlineVideoPlayer
                  thumbnail={heatherVideoThumbnail}
                  videoSrc="/videos/heather-intro.mp4"
                  alt="Heather - The Tax Queen"
                  className="w-full h-full rounded-2xl shadow-2xl"
                  aspectRatio="video"
                />
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
                Hi, I'm Heather
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a numbers person—but don't let that scare you. I won't be tossing any jargon your way, so if the phrase "capital gains" makes you go "huh?"—don't worry. You're in a safe space.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Just like you, I built my own business from the ground up, so I know firsthand how tough it can be. And with 8 years of experience working with nomadic solopreneurs, entrepreneurs, and small business owners just like you, I know exactly what keeps you awake at night.
              </p>
              <Button variant="cta" size="lg" className="mt-4" onClick={() => openQuiz()}>
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Credentials Strip */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {credentialsStrip.map((cred, index) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <cred.icon className="w-6 h-6 text-primary-foreground" />
                <span className="font-medium text-primary-foreground">{cred.label}</span>
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
            <Tabs defaultValue="why-me" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
                <TabsTrigger value="why-me" className="py-3 text-sm sm:text-base">Why Me</TabsTrigger>
                <TabsTrigger value="my-journey" className="py-3 text-sm sm:text-base">My Journey</TabsTrigger>
                <TabsTrigger value="my-beginning" className="py-3 text-sm sm:text-base">My Beginning</TabsTrigger>
              </TabsList>

              <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-sm">
                <TabsContent value="why-me" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <div className="lg:w-1/3 flex">
                      <img
                        src={heatherStoryTab1}
                        alt="Heather smiling"
                        className="rounded-xl w-full h-auto lg:h-full object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Your Success is My Mission</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Whether you're already in charge of a super-successful business with dozens of employees, or just starting out with a roster of one (you), my mission is to help you keep your finances compliant, optimized, and stress-free.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Together, we'll make the best financial decisions for your nomadic business so you can keep doing what you love for the long haul. There's nothing worse than feeling like a boss in your business … and at a total loss with your finances. That's where I come in.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="my-journey" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <div className="lg:w-1/3 flex">
                      <img
                        src={heatherStoryTab2}
                        alt="Heather and husband with RV"
                        className="rounded-xl w-full h-auto lg:h-full object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Hitting the Road</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        I've been an Enrolled Agent (EA) since 2014 and a nomadic business owner since 2016. That's when my husband and I moved ourselves and our two dogs into an RV and hit the road. Since then we've traveled all over North America, enjoying our favorite hobbies: walking up mountains, sampling local cuisine, and taste-testing microbrews.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Because I'm a nomad myself, I know exactly how stressful life on the road can be. Like those moments when you're pulled over on the side of the road for a work call and hoping your signal doesn't drop. Or when you're feeling great about life until you glance in your rearview mirror and see your bike rack and bikes dragging behind you down the interstate. True story …
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="my-beginning" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <div className="lg:w-1/3 flex">
                      <img
                        src={heatherStoryTab3}
                        alt="Heather decorating cupcakes"
                        className="rounded-xl w-full h-auto lg:h-full object-cover shadow-md"
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
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Featured On */}
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

      {/* Section 6: Parallax Divider */}
      <ParallaxDivider
        image={heatherMission}
        text="My Mission"
        subtext="Helping you keep more of what you earn—so you can live more of the life you love"
      />

      {/* Section 7: "Why Work With Me?" Section */}
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase">
                Why Work With Me?
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
                  src={heatherWhyWorkWithMe}
                  alt="Heather on phone with laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Credentials Deep Dive */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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

      {/* Section 9: CTA Section with Background Image */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src={heatherAboutCta}
            alt="Van in snowy mountains"
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
              <Button size="lg" variant="outline" className="rounded-full bg-transparent text-white border-white hover:bg-white/10" asChild>
                <a href="/services">Explore Services</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
