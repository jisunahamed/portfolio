import { useState, useEffect, useCallback } from "react";
import { PortfolioData, HeroData, AboutData, Project, Service, ContactData, ChatSettings, FooterData, FAQCategory, Client } from "@/lib/portfolioTypes";
import { defaultPortfolioData } from "@/lib/defaultPortfolioData";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      const { data: dbData, error } = await supabase
        .from('portfolio_data')
        .select('*')
        .eq('id', 'main')
        .single();

      if (error || !dbData) {
        console.log("No data in DB, using defaults");
        setData(defaultPortfolioData);
      } else {
        const portfolioData: PortfolioData = {
          hero: (dbData.hero as unknown as HeroData) || defaultPortfolioData.hero,
          about: (dbData.about as unknown as AboutData) || defaultPortfolioData.about,
          projects: (dbData.projects as unknown as Project[]) || defaultPortfolioData.projects,
          services: (dbData.services as unknown as Service[]) || defaultPortfolioData.services,
          contact: (dbData.contact as unknown as ContactData) || defaultPortfolioData.contact,
          chatSettings: (dbData.chat_settings as unknown as ChatSettings) || defaultPortfolioData.chatSettings,
          footer: (dbData.footer as unknown as FooterData) || defaultPortfolioData.footer,
          faq: ((dbData as any).faq as unknown as FAQCategory[]) || defaultPortfolioData.faq,
          clients: ((dbData.about as any)?.clients as unknown as Client[]) || defaultPortfolioData.clients,
        };
        setData(portfolioData);
      }
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  // Save data to Supabase
  const saveData = useCallback(async (newData: PortfolioData) => {
    setData(newData);

    const { error } = await supabase
      .from('portfolio_data')
      .update({
        hero: JSON.parse(JSON.stringify(newData.hero)) as Json,
        about: { ...JSON.parse(JSON.stringify(newData.about)), clients: newData.clients } as Json,
        projects: JSON.parse(JSON.stringify(newData.projects)) as Json,
        services: JSON.parse(JSON.stringify(newData.services)) as Json,
        contact: JSON.parse(JSON.stringify(newData.contact)) as Json,
        chat_settings: JSON.parse(JSON.stringify(newData.chatSettings)) as Json,
        footer: JSON.parse(JSON.stringify(newData.footer)) as Json,
        faq: JSON.parse(JSON.stringify(newData.faq)) as Json,
      } as any)
      .eq('id', 'main');

    if (error) {
      console.error("Failed to save portfolio data:", error);
      return false;
    }
    return true;
  }, []);

  // Direct save all data at once (for admin panel)
  const saveAllData = useCallback(async (newData: PortfolioData) => {
    const success = await saveData(newData);
    return success;
  }, [saveData]);

  // Update hero section
  const updateHero = useCallback((hero: HeroData) => {
    const newData = { ...data, hero };
    saveData(newData);
  }, [data, saveData]);

  // Update about section
  const updateAbout = useCallback((about: AboutData) => {
    const newData = { ...data, about };
    saveData(newData);
  }, [data, saveData]);

  // Projects CRUD
  const addProject = useCallback((project: Omit<Project, "id" | "order">) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      order: data.projects.length + 1,
    };
    const newData = { ...data, projects: [...data.projects, newProject] };
    saveData(newData);
    return newProject;
  }, [data, saveData]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    const newProjects = data.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    const newData = { ...data, projects: newProjects };
    saveData(newData);
  }, [data, saveData]);

  const deleteProject = useCallback((id: string) => {
    const newProjects = data.projects.filter((p) => p.id !== id);
    const newData = { ...data, projects: newProjects };
    saveData(newData);
  }, [data, saveData]);

  const reorderProjects = useCallback((projects: Project[]) => {
    const reordered = projects.map((p, index) => ({ ...p, order: index + 1 }));
    const newData = { ...data, projects: reordered };
    saveData(newData);
  }, [data, saveData]);

  // Services CRUD
  const addService = useCallback((service: Omit<Service, "id" | "order">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      order: data.services.length + 1,
    };
    const newData = { ...data, services: [...data.services, newService] };
    saveData(newData);
    return newService;
  }, [data, saveData]);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    const newServices = data.services.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    const newData = { ...data, services: newServices };
    saveData(newData);
  }, [data, saveData]);

  const deleteService = useCallback((id: string) => {
    const newServices = data.services.filter((s) => s.id !== id);
    const newData = { ...data, services: newServices };
    saveData(newData);
  }, [data, saveData]);

  // Update contact
  const updateContact = useCallback((contact: ContactData) => {
    const newData = { ...data, contact };
    saveData(newData);
  }, [data, saveData]);

  // Update chat settings
  const updateChatSettings = useCallback((chatSettings: ChatSettings) => {
    const newData = { ...data, chatSettings };
    saveData(newData);
  }, [data, saveData]);

  // Update footer
  const updateFooter = useCallback((footer: FooterData) => {
    const newData = { ...data, footer };
    saveData(newData);
  }, [data, saveData]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    saveData(defaultPortfolioData);
  }, [saveData]);

  // Export data
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  // Import data
  const importData = useCallback((jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      saveData({ ...defaultPortfolioData, ...parsed });
      return true;
    } catch (e) {
      console.error("Failed to import data:", e);
      return false;
    }
  }, [saveData]);

  return {
    data,
    isLoaded,
    updateHero,
    updateAbout,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    addService,
    updateService,
    deleteService,
    updateContact,
    updateChatSettings,
    updateFooter,
    resetToDefaults,
    exportData,
    importData,
    saveAllData,
  };
};

// Simple hook for read-only access (for public pages)
export const usePortfolioDataReadOnly = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dbData, error } = await supabase
        .from('portfolio_data')
        .select('*')
        .eq('id', 'main')
        .single();

      if (error || !dbData) {
        setData(defaultPortfolioData);
      } else {
        const portfolioData: PortfolioData = {
          hero: (dbData.hero as unknown as HeroData) || defaultPortfolioData.hero,
          about: (dbData.about as unknown as AboutData) || defaultPortfolioData.about,
          projects: (dbData.projects as unknown as Project[]) || defaultPortfolioData.projects,
          services: (dbData.services as unknown as Service[]) || defaultPortfolioData.services,
          contact: (dbData.contact as unknown as ContactData) || defaultPortfolioData.contact,
          chatSettings: (dbData.chat_settings as unknown as ChatSettings) || defaultPortfolioData.chatSettings,
          footer: (dbData.footer as unknown as FooterData) || defaultPortfolioData.footer,
          faq: ((dbData as any).faq as unknown as FAQCategory[]) || defaultPortfolioData.faq,
          clients: ((dbData.about as any)?.clients as unknown as Client[]) || defaultPortfolioData.clients,
        };
        setData(portfolioData);
      }
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  return { data, isLoaded };
};
