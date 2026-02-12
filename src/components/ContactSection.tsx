import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Send,
  Facebook,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
};

const ContactSection = () => {
  const { data } = usePortfolioDataReadOnly();
  const { contact } = data;
  const visibleSocialLinks = contact.socialLinks.filter((s) => s.visible);

  const [serviceType, setServiceType] = useState("n8n Automation");
  const [budgetRange, setBudgetRange] = useState("$500 - $1k");

  const handleSmartContact = () => {
    const subject = `Inquiry: ${serviceType} Project`;
    const body = `Hi Jisun,%0D%0A%0D%0AI'm interested in a ${serviceType} project.%0D%0ABudget Range: ${budgetRange}%0D%0A%0D%0AContext:%0D%0A[Describe your automation needs here]`;
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-glass/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
            Start Your <span className="text-gradient">Automation</span> Journey
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Skip the back-and-forth. Tell me what you need, and let's get building.
          </p>
        </header>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left: Smart Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Quick Inquiry
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">I need help with...</label>
                <div className="grid grid-cols-2 gap-2">
                  {['n8n Automation', 'Chatbot', 'Data Scraping', 'Integration'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setServiceType(type)}
                      className={`p-3 rounded-lg text-sm border transition-all text-left ${serviceType === type
                        ? 'bg-primary/20 border-primary text-primary font-medium'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Estimated Budget</label>
                <div className="grid grid-cols-3 gap-2">
                  {['<$500', '$500 - $1k', '$1k+'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setBudgetRange(range)}
                      className={`p-2 rounded-lg text-sm border transition-all ${budgetRange === range
                        ? 'bg-secondary/20 border-secondary text-secondary font-medium'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full text-base py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                onClick={handleSmartContact}
              >
                <Send className="w-5 h-5 mr-2" />
                Compose Email Request
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Opens your default email client with a pre-filled template.
              </p>
            </div>
          </div>

          {/* Right: Direct Contact & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Prefer a direct approach?</h3>
              <p className="text-muted-foreground">
                You can always reach me directly via email or social media. I typically respond within 12 hours.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Me</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Based in</p>
                  <p className="font-medium">{contact.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Connect on Socials</p>
              <div className="flex gap-4">
                {visibleSocialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon] || Github;
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary"
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
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

export default ContactSection;


