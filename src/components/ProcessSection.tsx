import { motion } from "framer-motion";
import { Search, FileJson, Cpu, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Discovery & Strategy",
        description: "We analyze your manual workflows, identify bottlenecks, and map out an automation strategy tailored to your ROI goals.",
        icon: Search,
        color: "blue",
    },
    {
        id: 2,
        title: "Architecture Blueprint",
        description: "I design the n8n workflows and database schemas. You verify the logic before a single line of code is written.",
        icon: FileJson,
        color: "purple",
    },
    {
        id: 3,
        title: "Development & Testing",
        description: "Building the agents and integrations. Rigorous testing ensures your automation handles edge cases and errors gracefully.",
        icon: Cpu,
        color: "pink",
    },
    {
        id: 4,
        title: "Handover & Training",
        description: "Deployment to your infrastructure. I provide video documentation and training so you own your new system.",
        icon: Rocket,
        color: "green",
    },
];

const ProcessSection = () => {
    return (
        <section id="process" aria-labelledby="process-heading" className="py-16 sm:py-24 relative overflow-hidden bg-black/5">
            {/* Background Line */}
            <div className="absolute left-[30px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -z-10" />

            <div className="container mx-auto px-4 sm:px-6">
                <header className="text-center mb-16 sm:mb-24">
                    <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
                        How I Work
                    </span>
                    <h2 id="process-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
                        From Chaos to <span className="text-gradient">Control</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                        A transparent, step-by-step process to ensure your automation triggers perfectly, every time.
                    </p>
                </header>

                <div className="relative max-w-4xl mx-auto space-y-12 sm:space-y-0">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`relative flex flex-col sm:flex-row gap-8 items-center ${index % 2 === 0 ? "sm:flex-row-reverse text-left sm:text-right" : "text-left"
                                }`}
                        >
                            {/* Step Content */}
                            <div className="flex-1 w-full pl-16 sm:pl-0 sm:w-1/2">
                                <div className={`
                  glass-card p-6 rounded-2xl border border-white/5 
                  hover:border-primary/30 transition-colors
                  ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}
                `}>
                                    <div className="text-primary font-mono text-sm mb-2 opacity-70">
                                        Phase 0{step.id}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-0 sm:left-1/2 -translate-x-[calc(50%-30px)] sm:-translate-x-1/2 flex flex-col items-center justify-center w-16">
                                {/* Circle */}
                                <div className="w-12 h-12 rounded-full bg-background border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                                    <step.icon className="w-5 h-5 text-primary" />
                                </div>
                            </div>

                            <div className="flex-1 hidden sm:block w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
