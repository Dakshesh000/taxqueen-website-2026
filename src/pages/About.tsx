import { motion } from "motion/react";
import { MapPin, Award, Heart, Users, Compass, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxDivider from "@/components/ui/ParallaxDivider";
import { useQuiz } from "@/contexts/QuizContext";
import heatherPortrait from "@/assets/heather/portrait-square.png";
import heatherInVan from "@/assets/heather/heather-in-van.jpg";
import rvMountains from "@/assets/lifestyle/rv-mountains-background.jpg";
import freedomNomad from "@/assets/lifestyle/freedom-nomad.jpg";

const About = () => {
  const { openQuiz } = useQuiz();
  
  const credentials = [
    { icon: Award, label: "Enrolled Agent (EA)", desc: "Licensed to represent before IRS" },
    { icon: Shield, label: "Tax Strategist", desc: "Proactive planning, not just filing" },
    { icon: MapPin, label: "Full-Time Nomad", desc: "Living the lifestyle since 2016" },
    { icon: Users, label: "EA Since 2014", desc: "10+ years federal tax expertise" },
  ];

  const featuredMedia = [
    { name: "Drivin' & Vibin'", url: "https://drivinvibin.com/" },
    { name: "Rootless Living", url: "http://rootlessliving.com/" },
    { name: "Heath & Alyssa", url: "https://heathandalyssa.com/" },
    { name: "XSCAPERS", url: "https://www.escapees.com/" },
    { name: "Nervda", url: "https://nervda.com/" },
  ];

  const values = [
    { icon: Heart, title: "Freedom First", desc: "Your lifestyle isn't an obstacle—it's the goal. I build strategies around your adventures." },
    { icon: Compass, title: "Clarity Over Complexity", desc: "No jargon, no confusion. Just clear guidance you can actually follow." },
    { icon: Sparkles, title: "Proactive Protection", desc: "I don't wait for tax season. Year-round strategy keeps you ahead of surprises." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section - Personal Introduction */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3.5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heatherPortrait} 
                  alt="Heather - The Tax Queen" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge - top right */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                <p className="text-sm font-medium uppercase tracking-wide">The Tax Queen</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-primary font-medium uppercase tracking-widest text-sm">Meet Your Tax Strategist</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Hi, I'm Heather
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm an Enrolled Agent, tax strategist, and full-time digital nomad who's been 
                living the RV life since 2016. I understand your lifestyle because I live it too.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I started traveling full-time, I quickly realized that traditional tax advice 
                didn't work for people like us. So I specialized in helping digital nomads, 
                remote workers, and location-independent entrepreneurs navigate the unique 
                tax challenges of our lifestyle.
              </p>
              <Button size="lg" className="mt-4" onClick={() => openQuiz()}>
                Let's Work Together
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Credentials Strip */}
      <section className="py-12 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <cred.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">{cred.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cred.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Story - Tabbed Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">My Journey</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
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
                        alt="Heather's early RV days" 
                        className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Trading the 9-to-5 for the Open Road</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        In 2016, I made a decision that changed everything. After years in the corporate world, 
                        I sold most of what I owned, bought an RV, and hit the road. It was terrifying, 
                        exhilarating, and the best decision I ever made.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        But that first tax season as a nomad? It was a nightmare. I quickly discovered that 
                        most tax professionals had no idea how to handle someone with no permanent address, 
                        income from multiple states, and a "home" with wheels.
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
                      <h3 className="text-2xl font-bold text-foreground">Finding My Calling</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        I became obsessed with learning everything about taxes for nomads. I studied for my 
                        EA license, dove deep into multi-state taxation, and discovered strategies most 
                        accountants never think about—because they've never lived this lifestyle.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Other nomads started asking for help. First a few friends, then friends of friends. 
                        I realized there was a massive gap—thousands of people living alternative lifestyles 
                        with no one who truly understood their unique tax situation.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="today" className="mt-0 space-y-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/3">
                      <img 
                        src={rvMountains} 
                        alt="Life today" 
                        className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                      />
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">Living & Working on My Terms</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Today, I help digital nomads, RVers, remote workers, and location-independent 
                        entrepreneurs save money, stay compliant, and build wealth—all while living life 
                        on their own terms.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I still travel full-time, work from wherever I park, and wake up to a different view 
                        whenever I want. I'm not just your tax strategist—I'm proof that this lifestyle works. 
                        And I'm here to make sure taxes never hold you back from your adventure.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values with Parallax */}
      <ParallaxDivider
        image={rvMountains}
        text="My Mission"
        subtext="Helping you keep more of what you earn—so you can live more of the life you love"
      />

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">What Guides Me</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              My Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-sm text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured On - Simple & Elegant */}
      <section className="py-16 border-y border-border">
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

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Take Control of Your Taxes?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you need help with tax preparation, want a comprehensive strategy session, 
              or just have questions about nomad taxes—I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/#services">Explore Services</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/#contact">Book a Call</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
