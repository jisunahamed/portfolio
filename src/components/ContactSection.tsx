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
} from "lucide-react";
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
            Contact <span className="text-gradient">Jisun Ahamed</span> for AI Automation Solutions
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Ready to automate your workflows with <strong>AI automation</strong> and <strong>n8n</strong>? I'm always excited to discuss new projects and opportunities.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-5 sm:space-y-8 order-2 md:order-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Let's Build Something Amazing with <strong>AI Automation</strong>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Whether you need a complex <strong>n8n workflow automation</strong>, <strong>custom chatbot development</strong>, or just want to chat about the possibilities of AI,
                  I'm here to help. Drop me a message and let's explore how we can work together.
                </p>
              </div>

              {/* Contact Details */}
              <address className="space-y-3 sm:space-y-4 not-italic">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl hover:border-primary/50 transition-colors group active:scale-[0.98]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm sm:text-base truncate">{contact.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-sm sm:text-base truncate">{contact.location}</p>
                  </div>
                </div>
              </address>

              {/* Social Links */}
              {visibleSocialLinks.length > 0 && (
                <nav aria-label="Social media links">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Find me on</p>
                  <div className="flex gap-3 sm:gap-4 flex-wrap">
                    {visibleSocialLinks.map((social) => {
                      const IconComponent = iconMap[social.icon] || Github;
                      return (
                        <motion.a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl glass-card flex items-center justify-center hover:border-primary/50 transition-colors group active:scale-95"
                          aria-label={`Follow Jisun Ahamed on ${social.icon}`}
                          title={`Jisun Ahamed on ${social.icon}`}
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                        </motion.a>
                      );
                    })}
                  </div>
                </nav>
              )}
            </div>

            {/* CTA Card */}
            <div className="order-1 md:order-2">
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 glow-border h-full flex flex-col justify-center">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Send className="w-7 h-7 sm:w-10 sm:h-10 text-primary" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Quick Chat</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Use the AI chat assistant to get instant answers about <strong>AI automation services</strong> or schedule a call.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full text-sm sm:text-base py-5 sm:py-6"
                      onClick={() => {
                        const chatButton = document.querySelector(
                          "[data-chat-trigger]"
                        ) as HTMLButtonElement;
                        if (chatButton) chatButton.click();
                      }}
                      aria-label="Start a conversation about AI automation"
                    >
                      Start a Conversation
                    </Button>
                    <Button
                      variant="glow"
                      size="lg"
                      className="w-full text-sm sm:text-base py-5 sm:py-6"
                      asChild
                    >
                      <a href={`mailto:${contact.email}`} aria-label="Send email to Jisun Ahamed">Send Email</a>
                    </Button>
                  </div>

                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


