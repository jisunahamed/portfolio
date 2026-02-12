import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Bot } from "lucide-react";
import { Button } from "./ui/button";
import TypewriterText from "./TypewriterText";
import ParticleBackground from "./ParticleBackground";
import TechStackMarquee from "./TechStackMarquee";
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden gradient-bg pt-20"
    >
      {/* Node Network Background */}
      <ParticleBackground />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden="true" />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo with Node Connection Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative inline-block"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <img
              src={hero.photoUrl}
              alt={hero.name}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-background/50 backdrop-blur shadow-2xl"
            />
            {/* Online Status Dot */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background shadow-lg shadow-green-500/50" />

            {/* Decorative Connection Lines */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary animate-spin-slow" />
            </svg>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient glitch-text" data-text={hero.name}>
              {hero.name}
            </span>
          </motion.h1>

          {/* Terminal Style Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-black/40 border border-primary/20 backdrop-blur-md mb-8 font-mono text-sm sm:text-base text-primary shadow-lg shadow-primary/5"
          >
            <span className="text-green-500">➜</span>
            <span className="text-blue-400">~</span>
            <span className="text-muted-foreground">exec</span>
            <TypewriterText
              texts={[
                "n8n_workflow_automation.exe",
                "build_ai_agents.py",
                "scale_business_logic.sh",
                "integrate_apis.js"
              ]}
              className="text-primary font-bold"
            />
            <span className="animate-pulse">_</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button variant="hero" size="xl" onClick={scrollToContact} className="group min-w-[200px]">
              <Bot className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              {hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="xl" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })} className="min-w-[200px] border-primary/20 hover:bg-primary/5">
              <Zap className="w-5 h-5 mr-2" />
              {hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Marquee (Bottom) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 w-full mt-auto"
      >
        <TechStackMarquee />
      </motion.div>
    </section>
  );
};

export default HeroSection;

