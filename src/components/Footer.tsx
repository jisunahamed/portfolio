import { motion } from "framer-motion";
import { Heart, Code2, ArrowUp } from "lucide-react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

const Footer = () => {
  const { data } = usePortfolioDataReadOnly();
  const { footer } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border/50 relative" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-lg font-bold font-mono text-gradient"
            whileHover={{ scale: 1.05 }}
            title="Jisun Ahamed - AI Automation Specialist"
          >
            {footer.logoText}
          </motion.a>

          {/* Copyright & Tagline */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-destructive fill-destructive" aria-hidden="true" />
              <span>and</span>
              <Code2 className="w-4 h-4 text-primary" aria-hidden="true" />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              &copy; 2025 <strong>Jisun Ahamed</strong> - AI Automation Specialist | All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground mt-1">{footer.tagline}</p>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors group"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
