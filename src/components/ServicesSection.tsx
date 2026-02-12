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
  Code,
  Check,
} from "lucide-react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Workflow,
  Plug,
  Zap,
  Sparkles,
  MessageSquare,
  Globe,
  Lightbulb,
  Code,
};

const ServicesSection = () => {
  const { data } = usePortfolioDataReadOnly();
  // Sort services by order
  const services = [...data.services].sort((a, b) => a.order - b.order);

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

        {/* Services Pipeline */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[100px] left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 relative" role="list">
            {services.slice(0, 3).map((service, index) => {
              const Icon = icons[service.icon] || Code;
              return (
                <div key={service.id} className="relative group">
                  {/* Connection Arrow (Desktop) */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-[100px] -right-4 w-8 h-8 z-0 text-primary/30 animate-pulse">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </div>
                  )}
                  {/* Connection Line (Mobile) */}
                  <div className="lg:hidden absolute left-8 top-full h-8 w-0.5 bg-primary/30 -z-10" />

                  <div className="relative z-10 h-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 opacity-90 hover:opacity-100 transition-opacity">
                    <div className="h-full bg-background/90 backdrop-blur-xl rounded-xl p-6 border border-white/5 hover:border-primary/50 transition-colors flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-mono text-primary mb-4">
                        Step 0{index + 1}
                      </div>

                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <ul className="text-left w-full space-y-2 mt-auto">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Services Grid (if any) */}
        {services.length > 3 && (
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(3).map((service) => {
              const Icon = icons[service.icon] || Code;
              return (
                <div key={service.id} className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                    <h3 className="font-bold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
