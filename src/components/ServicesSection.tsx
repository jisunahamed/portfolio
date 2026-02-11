import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  Plug,
  Zap,
  Sparkles,
  MessageSquare,
  Globe,
  Lightbulb,
} from "lucide-react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Workflow,
  Plug,
  Zap,
  Sparkles,
  MessageSquare,
  Globe,
  Lightbulb,
};

const ServicesSection = () => {
  const { data } = usePortfolioDataReadOnly();
  const services = data.services.sort((a, b) => a.order - b.order);

  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
            What I Offer
          </span>
          <h2 id="services-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
            Professional <span className="text-gradient">AI Automation</span> Services
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            End-to-end <strong>n8n automation</strong>, <strong>chatbot development</strong>, and <strong>AI integration</strong> solutions designed to transform your business operations.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6" role="list" aria-label="AI Automation services offered">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Workflow;
            return (
              <article
                key={service.id}
                role="listitem"
                className="group hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="h-full glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 glow-border transition-all duration-300 group-hover:border-primary/50">
                  {/* Icon */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 sm:space-y-2" aria-label={`${service.title} features`}>
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 shrink-0" aria-hidden="true" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


