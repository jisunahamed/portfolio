import { motion } from "framer-motion";

const techStack = [
  { name: "n8n", icon: "https://n8n.io/favicon.ico" }, // We'll need better assets later, using placeholders text for now if icons fail
  { name: "OpenAI", icon: "" },
  { name: "Python", icon: "" },
  { name: "Supabase", icon: "" },
  { name: "PostgreSQL", icon: "" },
  { name: "Anthropic", icon: "" },
  { name: "Docker", icon: "" },
  { name: "AWS", icon: "" },
  { name: "Zapier", icon: "" },
];

const TechStackMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm border-y border-white/5 py-8">
      <div className="relative flex max-w-[100vw] overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 px-12">
          {[...techStack, ...techStack].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 group opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.8)] transition-all" />
              <span className="text-xl font-mono tracking-wider font-bold text-foreground/80 group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TechStackMarquee;
