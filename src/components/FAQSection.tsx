import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, DollarSign, Clock, Globe, Wrench, Sparkles, Cpu, Plug, Lightbulb, Bot, Workflow } from "lucide-react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";
import { FAQCategory } from "@/lib/portfolioTypes";
import { defaultPortfolioData } from "@/lib/defaultPortfolioData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle, MessageCircle, DollarSign, Clock, Globe, Wrench, Sparkles, Cpu, Plug, Lightbulb, Bot, Workflow,
};

const FAQSection = () => {
  const { data, isLoaded } = usePortfolioDataReadOnly();

  const faqData: FAQCategory[] = isLoaded && data.faq?.length > 0 ? data.faq : defaultPortfolioData.faq;

  if (!faqData || faqData.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <header className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">FAQ</span>
          <h2 id="faq-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
            Common <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Everything you need to know about entrusting your business logic to an automated system.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqData.map((category) => {
            const IconComponent = iconMap[category.icon] || HelpCircle;
            return (
              <article key={category.id} className="glass-card rounded-2xl p-4 sm:p-6 glow-border">
                <header className="flex items-center gap-3 mb-4">
                  <IconComponent className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-lg sm:text-xl font-semibold">{category.category}</h3>
                </header>

                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      className="border-border/50"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base hover:text-primary transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </article>
            );
          })}
        </div>

        <footer className="text-center mt-10 sm:mt-16">
          <p className="text-muted-foreground mb-4">
            Have more questions about <strong>AI automation</strong> or <strong>n8n services</strong>?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            title="Contact Jisun Ahamed for AI Automation Services"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Jisun Ahamed
          </a>
        </footer>
      </div>
    </section>
  );
};

export default FAQSection;
