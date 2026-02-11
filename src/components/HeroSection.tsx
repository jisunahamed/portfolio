import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Bot } from "lucide-react";
import { Button } from "./ui/button";
import TypewriterText from "./TypewriterText";
import ParticleBackground from "./ParticleBackground";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const HeroSection = () => {
  const { data } = usePortfolioDataReadOnly();
  const { hero } = data;

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden="true" />

      {/* Floating Geometric Shapes - Hidden on mobile for cleaner look */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-12 md:w-20 h-12 md:h-20 border border-primary/30 rounded-lg hidden sm:block"
        animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-[15%] w-10 md:w-16 h-10 md:h-16 border border-secondary/30 rounded-full hidden sm:block"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/3 right-[20%] w-8 md:w-12 h-8 md:h-12 bg-accent/10 rotate-45 hidden sm:block"
        animate={{ y: [0, -20, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-28 sm:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 sm:mb-8"
          >
            <div className="relative inline-block">
              {/* Glowing ring */}
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-md sm:blur-lg opacity-50 animate-pulse-glow" aria-hidden="true" />
              <img
                src={hero.photoUrl}
                alt={`${hero.name} - AI Automation Specialist and n8n Expert`}
                title={`${hero.name} - Professional AI Automation Specialist`}
                loading="eager"
                width="160"
                height="160"
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-3 sm:border-4 border-background shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card border border-primary/30 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading - SEO H1 */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient glitch-text" data-text={hero.name}>
              {hero.name}
            </span>
            <span className="sr-only"> - AI Automation Specialist and n8n Expert</span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 sm:mb-8 font-light"
          >
            <TypewriterText
              texts={[
                hero.subtitle,
                "AI Automation Specialist",
                "n8n Workflow Expert",
                "Transforming Ideas into Automation",
              ]}
              className="text-gradient font-medium"
            />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
          >
            {hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button variant="hero" size="xl" onClick={scrollToContact} className="group">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              {hero.ctaPrimary}
            </Button>
            <Button variant="glow" size="xl" onClick={() => {
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <Zap className="w-5 h-5" aria-hidden="true" />
              {hero.ctaSecondary}
            </Button>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-6 sm:mt-16 mb-16 sm:mb-0 flex flex-wrap justify-center gap-2 sm:gap-4 px-2"
            role="list"
            aria-label="Technology expertise"
          >
            {hero.techStack.map((tech) => (
              <span
                key={tech}
                role="listitem"
                className="skill-badge text-xs sm:text-sm px-2.5 sm:px-4 py-1.5 sm:py-2"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile to avoid overlap */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden sm:flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;

