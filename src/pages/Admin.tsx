import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Settings, LogOut, Save, Plus, Trash2, ArrowLeft, Download, Menu, X, HelpCircle, Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { PortfolioData, HeroData, AboutData, Project, Service, ContactData, ChatSettings, FooterData, FAQCategory } from "@/lib/portfolioTypes";

type Tab = "hero" | "about" | "projects" | "services" | "contact" | "chat" | "footer" | "faq";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Admin = () => {
  // Force deployment: 2026-02-12T02:05:00
  const { user, isAdmin, isLoggedIn, isLoading, login, signUp, logout } = useAdminAuth();
  const {
    data,
    isLoaded,
    saveAllData,
    exportData,
    importData
  } = usePortfolioData();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImportClick = () => {
    document.getElementById('import-file')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          toast({ title: "Success", description: "Data imported successfully. Refreshing..." });
          setTimeout(() => window.location.reload(), 1000);
        } else {
          toast({ title: "Error", description: "Failed to import data. Invalid JSON.", variant: "destructive" });
        }
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Local draft state for editing
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);

  // Initialize draft data when data is loaded
  useEffect(() => {
    if (isLoaded && data) {
      setDraftData(JSON.parse(JSON.stringify(data)));
    }
  }, [isLoaded, data]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setAuthLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        toast({ title: "Sign Up Failed", description: error, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "You can now log in." });
        setIsSignUp(false);
      }
    } else {
      const { error } = await login(email, password);
      if (error) {
        toast({ title: "Login Failed", description: error, variant: "destructive" });
      } else {
        toast({ title: "Welcome!" });
      }
    }

    setAuthLoading(false);
  };

  // Update draft and mark as changed
  const updateDraftHero = (hero: HeroData) => {
    if (!draftData) return;
    setDraftData({ ...draftData, hero });
    setHasChanges(true);
  };

  const updateDraftAbout = (about: AboutData) => {
    if (!draftData) return;
    setDraftData({ ...draftData, about });
    setHasChanges(true);
  };

  const updateDraftContact = (contact: ContactData) => {
    if (!draftData) return;
    setDraftData({ ...draftData, contact });
    setHasChanges(true);
  };

  const updateDraftChatSettings = (chatSettings: ChatSettings) => {
    if (!draftData) return;
    setDraftData({ ...draftData, chatSettings });
    setHasChanges(true);
  };

  const updateDraftFooter = (footer: FooterData) => {
    if (!draftData) return;
    setDraftData({ ...draftData, footer });
    setHasChanges(true);
  };

  const updateDraftProject = (id: string, updates: Partial<Project>) => {
    if (!draftData) return;
    const newProjects = draftData.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    setDraftData({ ...draftData, projects: newProjects });
    setHasChanges(true);
  };

  const addDraftProject = () => {
    if (!draftData) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Short description",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      tags: [],
      status: "draft",
      order: draftData.projects.length + 1,
    };
    setDraftData({ ...draftData, projects: [...draftData.projects, newProject] });
    setHasChanges(true);
  };

  const deleteDraftProject = (id: string) => {
    if (!draftData) return;
    const newProjects = draftData.projects.filter((p) => p.id !== id);
    setDraftData({ ...draftData, projects: newProjects });
    setHasChanges(true);
  };

  const updateDraftService = (id: string, updates: Partial<Service>) => {
    if (!draftData) return;
    const newServices = draftData.services.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    setDraftData({ ...draftData, services: newServices });
    setHasChanges(true);
  };

  const addDraftService = () => {
    if (!draftData) return;
    const newService: Service = {
      id: Date.now().toString(),
      icon: "Sparkles",
      title: "New Service",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      order: draftData.services.length + 1,
    };
    setDraftData({ ...draftData, services: [...draftData.services, newService] });
    setHasChanges(true);
  };

  const deleteDraftService = (id: string) => {
    if (!draftData) return;
    const newServices = draftData.services.filter((s) => s.id !== id);
    setDraftData({ ...draftData, services: newServices });
    setHasChanges(true);
  };

  // Save all changes
  const handleSave = async () => {
    if (!draftData || !hasChanges) return;

    setIsSaving(true);
    try {
      const success = await saveAllData(draftData);

      if (success) {
        setHasChanges(false);
        toast({ title: "Saved!", description: "All changes have been saved." });
      } else {
        toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading || !isLoaded || !draftData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Not logged in - show auth form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 rounded-2xl max-w-md w-full"
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {isSignUp
              ? "Create an account to access the admin panel."
              : "Sign in to access the admin panel."}
          </p>
          <form onSubmit={handleAuth}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-3"
              required
              disabled={authLoading}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-4"
              minLength={6}
              required
              disabled={authLoading}
            />
            <Button type="submit" className="w-full" disabled={authLoading}>
              {authLoading ? "Please wait..." : (isSignUp ? "Sign Up" : "Login")}
            </Button>
          </form>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
          <Link to="/" className="block text-center mt-4 text-sm text-muted-foreground hover:text-primary">
            ← Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 rounded-2xl max-w-md w-full text-center"
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-destructive">Access Denied</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            Your account ({user?.email}) does not have admin privileges.
          </p>
          <div className="space-y-3">
            <Button onClick={logout} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">
              ← Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "chat", label: "Chat Settings", icon: MessageSquare },
    { id: "footer", label: "Footer", icon: Settings },
  ];

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/50 p-3 sm:p-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg sm:text-xl font-bold">
              Admin Panel <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">v1.1</span>
            </h1>
            {hasChanges && (
              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground">{user?.email}</span>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <input
              type="file"
              id="import-file"
              className="hidden"
              accept=".json"
              onChange={handleFileChange}
            />
            <Button variant="outline" onClick={handleImportClick} title="Import JSON">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="icon" onClick={exportData} title="Export JSON">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-6">
        <div className="grid lg:grid-cols-[240px_1fr] gap-4 sm:gap-6">
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            <motion.nav
              initial={{ x: -300 }}
              animate={{ x: isSidebarOpen ? 0 : -300 }}
              className={`fixed left-0 top-[57px] sm:top-[65px] bottom-0 w-64 bg-background border-r border-border/50 p-4 z-40 lg:hidden overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'}`}
            >
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <nav className="hidden lg:block space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            {activeTab === "hero" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">Hero Section</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <Input value={draftData.hero.name} onChange={(e) => updateDraftHero({ ...draftData.hero, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Subtitle</label>
                    <Input value={draftData.hero.subtitle} onChange={(e) => updateDraftHero({ ...draftData.hero, subtitle: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Photo URL</label>
                    <Input value={draftData.hero.photoUrl} onChange={(e) => updateDraftHero({ ...draftData.hero, photoUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Description</label>
                    <Textarea value={draftData.hero.description} onChange={(e) => updateDraftHero({ ...draftData.hero, description: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">About Section</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Bio</label>
                    <Textarea value={draftData.about.bio} onChange={(e) => updateDraftAbout({ ...draftData.about, bio: e.target.value })} rows={4} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Mission</label>
                    <Textarea value={draftData.about.mission} onChange={(e) => updateDraftAbout({ ...draftData.about, mission: e.target.value })} rows={4} />
                  </div>

                  {/* Skills Management */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium">Skills</label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newSkill = {
                            id: Date.now().toString(),
                            name: "New Skill",
                            icon: "Sparkles",
                            color: "primary"
                          };
                          updateDraftAbout({
                            ...draftData.about,
                            skills: [...draftData.about.skills, newSkill]
                          });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Skill
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {draftData.about.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                          <Input
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...draftData.about.skills];
                              newSkills[index] = { ...skill, name: e.target.value };
                              updateDraftAbout({ ...draftData.about, skills: newSkills });
                            }}
                            placeholder="Skill name"
                            className="flex-1"
                          />
                          <Input
                            value={skill.icon}
                            onChange={(e) => {
                              const newSkills = [...draftData.about.skills];
                              newSkills[index] = { ...skill, icon: e.target.value };
                              updateDraftAbout({ ...draftData.about, skills: newSkills });
                            }}
                            placeholder="Icon (e.g., Cpu, Globe)"
                            className="w-32"
                          />
                          <select
                            value={skill.color}
                            onChange={(e) => {
                              const newSkills = [...draftData.about.skills];
                              newSkills[index] = { ...skill, color: e.target.value };
                              updateDraftAbout({ ...draftData.about, skills: newSkills });
                            }}
                            className="bg-background border border-border rounded px-2 py-2 text-sm w-24"
                          >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="accent">Accent</option>
                          </select>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newSkills = draftData.about.skills.filter((_, i) => i !== index);
                              updateDraftAbout({ ...draftData.about, skills: newSkills });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Management */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium">Stats</label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newStats = [...draftData.about.stats, { label: "New Stat", value: "0+" }];
                          updateDraftAbout({ ...draftData.about, stats: newStats });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Stat
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {draftData.about.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                          <Input
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...draftData.about.stats];
                              newStats[index] = { ...stat, value: e.target.value };
                              updateDraftAbout({ ...draftData.about, stats: newStats });
                            }}
                            placeholder="Value (e.g., 5+)"
                            className="w-24"
                          />
                          <Input
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...draftData.about.stats];
                              newStats[index] = { ...stat, label: e.target.value };
                              updateDraftAbout({ ...draftData.about, stats: newStats });
                            }}
                            placeholder="Label (e.g., Years Experience)"
                            className="flex-1"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newStats = draftData.about.stats.filter((_, i) => i !== index);
                              updateDraftAbout({ ...draftData.about, stats: newStats });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-bold">Projects</h2>
                  <Button onClick={addDraftProject} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />Add Project
                  </Button>
                </div>
                <div className="space-y-4">
                  {draftData.projects.map((project) => (
                    <div key={project.id} className="p-3 sm:p-4 border border-border rounded-xl">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          {project.image && (
                            <img src={project.image} alt={project.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <Input value={project.title} onChange={(e) => updateDraftProject(project.id, { title: e.target.value })} placeholder="Title" className="mb-2" />
                            <Input value={project.image} onChange={(e) => updateDraftProject(project.id, { image: e.target.value })} placeholder="Image URL" />
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => deleteDraftProject(project.id)} className="flex-shrink-0"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        <Textarea value={project.description} onChange={(e) => updateDraftProject(project.id, { description: e.target.value })} placeholder="Short description (shown on card)" rows={2} />
                        <Textarea value={project.fullDescription || ""} onChange={(e) => updateDraftProject(project.id, { fullDescription: e.target.value })} placeholder="Full description (shown in popup)" rows={3} />
                        <Input value={project.youtubeUrl || ""} onChange={(e) => updateDraftProject(project.id, { youtubeUrl: e.target.value })} placeholder="YouTube Video URL (optional)" />
                        <Input value={project.tags.join(", ")} onChange={(e) => updateDraftProject(project.id, { tags: e.target.value.split(",").map(t => t.trim()) })} placeholder="Tags (comma separated)" />
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-muted-foreground">Status:</label>
                          <select
                            value={project.status}
                            onChange={(e) => updateDraftProject(project.id, { status: e.target.value as "published" | "draft" })}
                            className="bg-background border border-border rounded px-2 py-1 text-sm"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-bold">Services (What I Offer)</h2>
                  <Button onClick={addDraftService} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />Add Service
                  </Button>
                </div>
                <div className="space-y-4">
                  {draftData.services.map((service) => (
                    <div key={service.id} className="p-3 sm:p-4 border border-border rounded-xl">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <Input value={service.title} onChange={(e) => updateDraftService(service.id, { title: e.target.value })} placeholder="Service Title" className="mb-2" />
                            <Input value={service.icon} onChange={(e) => updateDraftService(service.id, { icon: e.target.value })} placeholder="Icon name (e.g., Workflow, Globe, Bot)" />
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => deleteDraftService(service.id)} className="flex-shrink-0"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        <Textarea value={service.description} onChange={(e) => updateDraftService(service.id, { description: e.target.value })} placeholder="Service description" rows={2} />
                        <Input value={service.features.join(", ")} onChange={(e) => updateDraftService(service.id, { features: e.target.value.split(",").map(f => f.trim()) })} placeholder="Features (comma separated)" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-bold">FAQ Section</h2>
                  <Button
                    onClick={() => {
                      if (!draftData) return;
                      const newCategory: FAQCategory = {
                        id: Date.now().toString(),
                        category: "New Category",
                        icon: "HelpCircle",
                        questions: [{ question: "New Question?", answer: "Answer here..." }],
                      };
                      setDraftData({ ...draftData, faq: [...(draftData.faq || []), newCategory] });
                      setHasChanges(true);
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />Add Category
                  </Button>
                </div>
                <div className="space-y-6">
                  {(draftData.faq || []).map((cat, catIndex) => (
                    <div key={cat.id} className="p-3 sm:p-4 border border-border rounded-xl space-y-3">
                      <div className="flex items-center gap-3">
                        <Input
                          value={cat.category}
                          onChange={(e) => {
                            const newFaq = [...draftData.faq];
                            newFaq[catIndex] = { ...cat, category: e.target.value };
                            setDraftData({ ...draftData, faq: newFaq });
                            setHasChanges(true);
                          }}
                          placeholder="Category name"
                          className="flex-1"
                        />
                        <Input
                          value={cat.icon}
                          onChange={(e) => {
                            const newFaq = [...draftData.faq];
                            newFaq[catIndex] = { ...cat, icon: e.target.value };
                            setDraftData({ ...draftData, faq: newFaq });
                            setHasChanges(true);
                          }}
                          placeholder="Icon (e.g., HelpCircle)"
                          className="w-36"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newFaq = draftData.faq.filter((_, i) => i !== catIndex);
                            setDraftData({ ...draftData, faq: newFaq });
                            setHasChanges(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="pl-2 sm:pl-4 space-y-3 border-l-2 border-border/50">
                        {cat.questions.map((q, qIndex) => (
                          <div key={qIndex} className="space-y-2 p-2 bg-muted/30 rounded-lg">
                            <div className="flex items-start gap-2">
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={q.question}
                                  onChange={(e) => {
                                    const newFaq = [...draftData.faq];
                                    const newQuestions = [...cat.questions];
                                    newQuestions[qIndex] = { ...q, question: e.target.value };
                                    newFaq[catIndex] = { ...cat, questions: newQuestions };
                                    setDraftData({ ...draftData, faq: newFaq });
                                    setHasChanges(true);
                                  }}
                                  placeholder="Question"
                                />
                                <Textarea
                                  value={q.answer}
                                  onChange={(e) => {
                                    const newFaq = [...draftData.faq];
                                    const newQuestions = [...cat.questions];
                                    newQuestions[qIndex] = { ...q, answer: e.target.value };
                                    newFaq[catIndex] = { ...cat, questions: newQuestions };
                                    setDraftData({ ...draftData, faq: newFaq });
                                    setHasChanges(true);
                                  }}
                                  placeholder="Answer"
                                  rows={2}
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const newFaq = [...draftData.faq];
                                  const newQuestions = cat.questions.filter((_, i) => i !== qIndex);
                                  newFaq[catIndex] = { ...cat, questions: newQuestions };
                                  setDraftData({ ...draftData, faq: newFaq });
                                  setHasChanges(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newFaq = [...draftData.faq];
                            const newQuestions = [...cat.questions, { question: "New Question?", answer: "Answer here..." }];
                            newFaq[catIndex] = { ...cat, questions: newQuestions };
                            setDraftData({ ...draftData, faq: newFaq });
                            setHasChanges(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Question
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">Contact Info</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input value={draftData.contact.email} onChange={(e) => updateDraftContact({ ...draftData.contact, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Location</label>
                    <Input value={draftData.contact.location} onChange={(e) => updateDraftContact({ ...draftData.contact, location: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">Chat Settings</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">n8n Webhook URL</label>
                    <Input value={draftData.chatSettings.webhookUrl} onChange={(e) => updateDraftChatSettings({ ...draftData.chatSettings, webhookUrl: e.target.value })} placeholder="https://your-n8n-instance.com/webhook/..." />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty to use demo responses</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Bot Name</label>
                    <Input value={draftData.chatSettings.botName} onChange={(e) => updateDraftChatSettings({ ...draftData.chatSettings, botName: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Welcome Message</label>
                    <Textarea value={draftData.chatSettings.welcomeMessage} onChange={(e) => updateDraftChatSettings({ ...draftData.chatSettings, welcomeMessage: e.target.value })} rows={3} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "footer" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">Footer</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Logo Text</label>
                    <Input value={draftData.footer.logoText} onChange={(e) => updateDraftFooter({ ...draftData.footer, logoText: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Copyright</label>
                    <Input value={draftData.footer.copyright} onChange={(e) => updateDraftFooter({ ...draftData.footer, copyright: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Tagline</label>
                    <Input value={draftData.footer.tagline} onChange={(e) => updateDraftFooter({ ...draftData.footer, tagline: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
