import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Plug,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Globe,
  Plug,
  Sparkles,
  Lightbulb,
};

const AboutSection = () => {
  const { data } = usePortfolioDataReadOnly();
  const { about, hero } = data;

  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-mesh opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
            About Me
          </span>
          <h2 id="about-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
            About <span className="text-gradient">Jisun Ahamed</span> - AI Solution Provider
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Expert in <strong>AI Automation</strong>, <strong>n8n workflow automation</strong>, <strong>chatbot development</strong>, and <strong>WordPress integration</strong>.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left: Photo and Info */}
          <div className="relative order-2 lg:order-1">
            {/* Profile Image Container */}
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-lg opacity-50 animate-pulse-glow" />

              <div className="relative glass-card rounded-2xl p-4 sm:p-6 glow-border">
                {/* Profile Photo */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={hero.photoUrl}
                    alt={`${hero.name} - AI Automation Specialist profile photo`}
                    title="Jisun Ahamed - Professional AI Automation Specialist"
                    loading="lazy"
                    width="300"
                    height="300"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-surface-elevated">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Specialist</p>
                      <p className="text-xs sm:text-sm font-medium truncate">AI Automation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-surface-elevated">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Focus</p>
                      <p className="text-xs sm:text-sm font-medium truncate">Business AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio and Skills */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Bio */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                Transforming Business Processes with <strong>AI-Powered Automation</strong>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I'm <strong>Jisun Ahamed</strong>, a professional <strong>AI Automation Specialist</strong> dedicated to helping businesses leverage the power of artificial intelligence and automation. {about.bio}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                My specialization in <strong>n8n automation</strong> and <strong>chatbot development</strong> helps businesses reduce manual work, improve efficiency, and scale their operations. {about.mission}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4" role="list" aria-label="AI Automation expertise areas">
              {about.skills.map((skill) => {
                const IconComponent = iconMap[skill.icon] || Cpu;
                return (
                  <motion.article
                    key={skill.id}
                    role="listitem"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-3 sm:p-4 rounded-xl glow-border cursor-pointer group"
                  >
                    <IconComponent
                      className={`w-5 h-5 sm:w-8 sm:h-8 mb-1.5 sm:mb-3 text-${skill.color} group-hover:scale-110 transition-transform`}
                      aria-hidden="true"
                    />
                    <h4 className="font-medium text-xs sm:text-sm">{skill.name}</h4>
                  </motion.article>
                );
              })}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 sm:pt-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 sm:p-0">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


