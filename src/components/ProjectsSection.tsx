import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Youtube, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";
import { Project } from "@/lib/portfolioTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

const ProjectsSection = () => {
  const { data } = usePortfolioDataReadOnly();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai-automation', label: 'AI Automation' },
    { id: 'vibe-project', label: 'Vibe Project' },
    { id: 'others', label: 'Others' },
  ];

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16 sm:py-24 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-glass/50 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest">
            Portfolio
          </span>
          <h2 id="projects-heading" className="section-heading mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">
            My <span className="text-gradient">Projects</span> & Case Studies
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            A selection of <strong>AI automation</strong>, <strong>Vibe Project</strong>, and various solutions I've built.
          </p>
        </header>

        {/* Projects Grid by Category */}
        <div className="space-y-20">
          {categories.filter(c => c.id !== 'all').map((category) => {
            const categoryProjects = data.projects
              .filter((p) => p.status === "published" && p.featured && p.category === category.id)
              .sort((a, b) => a.order - b.order)
              .slice(0, 2); // Show only 2 projects per category

            if (categoryProjects.length === 0) return null;

            return (
              <div key={category.id} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold text-foreground/90">{category.label}</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {categoryProjects.map((project) => (
                    <article
                      key={project.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden glow-border h-full transition-transform duration-300 hover:scale-[1.02]">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-foreground font-medium flex items-center gap-2">
                              View Details
                              <ArrowUpRight className="w-5 h-5" />
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-6">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h4 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                              {project.title}
                            </h4>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-20">
          <Link to="/projects">
            <Button variant="glow" size="lg" className="px-8 shadow-xl">
              See More Projects
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent
          className="max-w-4xl w-[95vw] md:w-full max-h-[90vh] p-0 border-none bg-card/95 backdrop-blur-xl flex flex-col overflow-hidden translate-y-[-50%]!"
          data-lenis-prevent
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-10">
            {selectedProject && (
              <div className="relative">
                {/* Hero Image with gradient overlay */}
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-10 -mt-16 relative z-10">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl sm:text-3xl">
                      {selectedProject.title}
                    </DialogTitle>
                  </DialogHeader>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        role="listitem"
                        className="px-3 py-1.5 text-xs font-mono bg-primary/15 text-primary rounded-full border border-primary/30 shadow-sm shadow-primary/10"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* YouTube Embed */}
                  {selectedProject.youtubeUrl && (() => {
                    const match = selectedProject.youtubeUrl!.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
                    const videoId = match?.[1];
                    return videoId ? (
                      <div className="mb-6">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`${selectedProject.title} video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

                  {/* Full Description */}
                  <DialogDescription className="text-base text-foreground/85 leading-relaxed whitespace-pre-line mb-8">
                    {selectedProject.fullDescription || selectedProject.description}
                  </DialogDescription>

                  {/* Optional Project Link */}
                  {selectedProject.link && (
                    <div className="mb-8">
                      <Button className="w-full sm:w-auto gap-2 group/btn" size="lg" asChild>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                          View Live Project
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* Workflow & Results Visuals */}
                  {(selectedProject.workflowImageUrl || selectedProject.results) && (
                    <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Automation Impact
                      </h4>

                      {/* Results Grid */}
                      {selectedProject.results && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                          {selectedProject.results.map((result, idx) => (
                            <div key={idx} className="bg-background/80 p-3 rounded-lg border border-border/50 text-center">
                              <span className="block text-lg font-bold text-primary">{result.split(' ')[0]}</span>
                              <span className="text-xs text-muted-foreground">{result.split(' ').slice(1).join(' ')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Workflow Image */}
                      {selectedProject.workflowImageUrl && (
                        <div className="rounded-lg overflow-hidden border border-border/50 relative group cursor-zoom-in" onClick={() => window.open(selectedProject.workflowImageUrl, '_blank')}>
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Click to Zoom</div>
                          <img
                            src={selectedProject.workflowImageUrl}
                            alt="n8n Workflow Diagram"
                            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
