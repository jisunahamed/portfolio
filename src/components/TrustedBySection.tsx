import { motion } from "framer-motion";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";
import { ExternalLink } from "lucide-react";

const TrustedBySection = () => {
    const { data } = usePortfolioDataReadOnly();
    const clients = data.clients?.filter(c => c.visible).sort((a, b) => a.order - b.order) || [];

    if (clients.length === 0) return null;

    // Duplicate clients for seamless infinite scroll
    const marqueeClients = [...clients, ...clients, ...clients, ...clients];

    return (
        <section className="py-24 border-y border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden group/section">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <span className="text-sm font-mono text-muted-foreground/60 uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                        Trusted by Innovative Companies
                    </span>
                </div>

                <div className="relative fade-mask">
                    {/* Gradient Masks for Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                    {/* Marquee Container */}
                    <div className="flex overflow-hidden select-none py-4">
                        <motion.div
                            className="flex gap-12 sm:gap-20 items-center flex-nowrap"
                            animate={{
                                x: [0, "-33.33%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 25, // Adjust speed here
                            }}
                        >
                            {marqueeClients.map((client, index) => (
                                <motion.a
                                    key={`${client.id}-${index}`}
                                    href={client.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center min-w-[140px] transition-all duration-500"
                                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                                    title={`Visit ${client.name}`}
                                >
                                    <div className="h-10 sm:h-12 w-auto relative filter drop-shadow-lg">
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-full w-auto object-contain transition-transform duration-500"
                                        />
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                    </div>
                                    <ExternalLink className="absolute -top-3 -right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-primary" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom thin accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
        </section>
    );
};

export default TrustedBySection;
