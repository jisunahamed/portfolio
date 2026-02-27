import { useState, useMemo } from "react";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/portfolioTypes";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AllProjects = () => {
    const { data } = usePortfolioDataReadOnly();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const categories = [
        { id: "all", label: "All" },
        { id: "ai-automation", label: "AI Automation" },
        { id: "vibe-project", label: "Vibe Project" },
        { id: "others", label: "Others" },
    ];

    const filteredProjects = useMemo(() => {
        return data.projects
            .filter((project) => {
                const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = activeCategory === "all" || project.category === activeCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => a.order - b.order);
    }, [data.projects, searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Background gradient from Hero */}
            <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 z-0 pointer-events-none" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-display">
                                All <span className="text-gradient">Projects</span>
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Explore my complete portfolio of {data.projects.length} automation solutions.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-4 z-40 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects by name or technology..."
                            className="pl-9 bg-surface-elevated/50 border-border/50 focus:border-primary/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${activeCategory === category.id
                                    ? "bg-primary/10 text-primary border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                                    : "bg-surface-elevated/50 text-muted-foreground border-transparent hover:bg-surface-elevated hover:text-foreground"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid used in ProjectsSection but mapped here */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="glass-card rounded-xl overflow-hidden glow-border h-full flex flex-col transition-transform duration-300 hover:scale-[1.02]">
                                {/* Project Image */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-foreground font-medium flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-full">
                                            View Details
                                            <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 text-[10px] font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="px-2.5 py-1 text-[10px] font-mono bg-muted text-muted-foreground rounded-full">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No projects found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Project Details Modal (Reused) */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-border/50 bg-background/95 backdrop-blur-xl">
                    {selectedProject && (
                        <div className="relative">
                            <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="absolute top-4 right-4 rounded-full bg-background/50 hover:bg-background backdrop-blur-md"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <ArrowUpRight className="w-4 h-4 rotate-180" /> {/* Close icon visual placeholder using existing lucide */}
                                </Button>
                            </div>

                            <div className="p-6 md:p-8 -mt-20 relative z-10">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                    <div>
                                        <DialogHeader>
                                            <DialogTitle className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                                                {selectedProject.title}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedProject.tags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-[2fr,1fr] gap-8">
                                    <div className="space-y-6">
                                        <DialogDescription className="text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                                            {selectedProject.fullDescription || selectedProject.description}
                                        </DialogDescription>

                                        {/* Results / Impact */}
                                        {selectedProject.results && (
                                            <div className="bg-muted/20 rounded-xl p-5 border border-border/50">
                                                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">Key Results</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {selectedProject.results.map((result, idx) => (
                                                        <div key={idx} className="bg-background/50 p-3 rounded-lg border border-border/30">
                                                            <p className="font-semibold text-foreground">{result}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {selectedProject.link && (
                                            <Button className="w-full gap-2" size="lg" asChild>
                                                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                                    View Live Project <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}

                                        {selectedProject.youtubeUrl && (
                                            <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
                                                {/* Simple Youtube Embed Logic */}
                                                <iframe
                                                    className="w-full aspect-video"
                                                    src={`https://www.youtube.com/embed/${selectedProject.youtubeUrl.split('/').pop()}`}
                                                    title="Project Demo"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )}

                                        {selectedProject.workflowImageUrl && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium text-muted-foreground">Workflow Diagram</h4>
                                                <div className="rounded-xl overflow-hidden border border-border/50 cursor-zoom-in" onClick={() => window.open(selectedProject.workflowImageUrl, '_blank')}>
                                                    <img
                                                        src={selectedProject.workflowImageUrl}
                                                        alt="Workflow"
                                                        className="w-full h-auto hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllProjects;
