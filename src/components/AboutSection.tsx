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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Bio & Timeline */}
          <div className="order-2 lg:order-1 space-y-8">
            <header className="text-left">
              <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
                About Me
              </span>
              <h2 id="about-heading" className="section-heading mt-3 text-3xl sm:text-4xl md:text-5xl">
                The Human Behind the <span className="text-gradient">Bots</span>
              </h2>
            </header>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                I'm <strong>Jisun Ahamed</strong>, an <strong>AI Automation Specialist</strong> who believes that technology should serve people, not the other way around.
                {about.bio}
              </p>
              <p>
                My mission is simple: <strong>Eliminate busywork.</strong> By combining advanced LLMs with robust n8n workflows, I build systems that give business owners their time back.
              </p>
            </div>

            {/* Experience Timeline */}
            <div className="relative border-l border-white/10 pl-8 ml-3 space-y-8 py-4">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                <span className="text-xs font-mono text-primary mb-1 block">2024 - Present</span>
                <h4 className="text-lg font-bold text-foreground">AI Automation Specialist</h4>
                <p className="text-sm text-muted-foreground mt-1">Focusing 100% on n8n workflows and AI Agents for US/UK clients.</p>
              </div>
              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border-2 border-white/20" />
                <span className="text-xs font-mono text-muted-foreground mb-1 block">2022 - 2023</span>
                <h4 className="text-lg font-bold text-foreground">Full Stack Developer</h4>
                <p className="text-sm text-muted-foreground mt-1">Built web applications and integrated APIs, laying the foundation for complex automation logic.</p>
              </div>
              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border-2 border-white/20" />
                <span className="text-xs font-mono text-muted-foreground mb-1 block">2020 - 2021</span>
                <h4 className="text-lg font-bold text-foreground">WordPress Specialist</h4>
                <p className="text-sm text-muted-foreground mt-1">Mastered the art of CMS and plugin integrations.</p>
              </div>
            </div>
          </div>

          {/* Right: Stats & Skills */}
          <div className="relative order-1 lg:order-2">

            {/* Profile Image with Tech Halo */}
            <div className="relative max-w-sm mx-auto mb-12 lg:mb-16">
              {/* Rotating Ring */}
              <div className="absolute inset-0 -m-4 border border-dashed border-primary/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />

              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden relative z-10 glow-border">
                <img
                  src={hero.photoUrl}
                  alt={hero.name}
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 top-8 bg-surface-elevated/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Automations</p>
                    <p className="text-xl font-bold">50+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-4 bottom-8 bg-surface-elevated/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-lg"><Cpu className="w-5 h-5 text-secondary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Hours Saved</p>
                    <p className="text-xl font-bold">1000+</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 text-center lg:text-left">Tech Arsenal</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {about.skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Cpu;
                  return (
                    <div key={skill.id} className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                      <IconComponent className={`w-5 h-5 text-${skill.color}`} />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


