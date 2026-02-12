import { motion } from "framer-motion";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";
import { ExternalLink } from "lucide-react";

const TrustedBySection = () => {
    const { data } = usePortfolioDataReadOnly();
    const clients = data.clients?.filter(c => c.visible).sort((a, b) => a.order - b.order) || [];

    if (clients.length === 0) return null;

    return (
        <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm font-mono text-muted-foreground mb-8 uppercase tracking-widest">
                    Trusted by Innovative Companies
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {clients.map((client) => (
                        <motion.a
                            key={client.id}
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
                            whileHover={{ scale: 1.05 }}
                            title={`Visit ${client.name}`}
                        >
                            <div className="h-8 md:h-10 w-auto relative">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-full w-auto object-contain"
                                />
                                <ExternalLink className="absolute -top-2 -right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;
