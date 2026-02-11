import { PortfolioData } from "./portfolioTypes";

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Jisun Ahamed",
    subtitle: "AI Automation Specialist | Transforming Ideas into Intelligent Solutions",
    photoUrl: "https://i.ibb.co.com/7JGw9jHt/Picsart-25-10-15-13-11-26-300.jpg",
    description: "I craft intelligent automation systems that save time, reduce errors, and scale your business. Specializing in AI workflows, WordPress development, and custom API integrations.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "View My Work",
    techStack: ["AI Automation", "n8n", "WordPress", "API Integration", "Prompt Engineering"],
  },
  about: {
    bio: "With expertise in n8n workflow automation, GPT-4 and Claude AI integration, WordPress development, and custom API solutions, I help businesses streamline their operations, reduce costs by up to 60%, and unlock the power of artificial intelligence. Having completed 50+ successful automation projects, I've helped clients save 15-25 hours per week and achieve ROI within 2-3 months.",
    mission: "My mission is to make AI accessible and practical for businesses of all sizes, from startups to enterprises. Through innovative automation solutions using n8n, custom chatbots, and intelligent integrations, I bridge the gap between cutting-edge AI technology and real-world business needs. Based in Bangladesh, I serve clients worldwide with a 24-hour response time and 98% satisfaction rate.",
    skills: [
      { id: "1", name: "AI Automation", icon: "Cpu", color: "primary" },
      { id: "2", name: "WordPress Development", icon: "Globe", color: "secondary" },
      { id: "3", name: "API Integration", icon: "Plug", color: "accent" },
      { id: "4", name: "Prompt Engineering", icon: "Sparkles", color: "primary" },
      { id: "5", name: "AI Solution Provider", icon: "Lightbulb", color: "secondary" },
    ],
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Delivered", value: "50+" },
      { label: "Automations Built", value: "200+" },
      { label: "Happy Clients", value: "30+" },
    ],
  },
  projects: [
    {
      id: "1",
      title: "AI-Powered Customer Support Automation",
      description: "Intelligent chatbot system reducing response time by 80%",
      fullDescription: "Developed an intelligent chatbot system using n8n workflows that reduced response time by 80% and handles 1000+ queries daily. The system integrates with multiple platforms including WhatsApp, Facebook Messenger, and web chat, providing seamless customer support 24/7. Features include automated ticket creation, sentiment analysis, and escalation to human agents when needed.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      tags: ["AI Automation", "n8n", "API Integration", "Prompt Engineering"],
      status: "published",
      order: 1,
    },
    {
      id: "2",
      title: "WordPress Multi-Site AI Content Manager",
      description: "AI content generation across 10+ websites",
      fullDescription: "Built a custom WordPress solution with AI content generation capabilities, streamlining content creation across 10+ websites. The platform uses GPT-4 for generating SEO-optimized articles, product descriptions, and social media posts. Includes automated scheduling, content approval workflows, and analytics dashboard for tracking content performance.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["WordPress", "AI Automation", "API Integration"],
      status: "published",
      order: 2,
    },
    {
      id: "3",
      title: "Comprehensive API Integration Hub",
      description: "Centralized platform connecting 15+ business tools",
      fullDescription: "Created a centralized integration platform connecting 15+ business tools, automating data flow and reducing manual work by 90%. The hub synchronizes data between CRM, accounting software, inventory management, and communication tools. Features real-time webhooks, error handling with automatic retries, and comprehensive logging for debugging.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      tags: ["API Integration", "AI Automation", "Prompt Engineering"],
      status: "published",
      order: 3,
    },
  ],
  services: [
    {
      id: "1",
      icon: "Workflow",
      title: "AI Workflow Automation",
      description: "Custom workflows using n8n, Make, and Zapier that connect your apps, automate repetitive tasks, and streamline operations.",
      features: ["Multi-step automations", "Error handling", "Scheduled triggers"],
      order: 1,
    },
    {
      id: "2",
      icon: "Globe",
      title: "WordPress Custom Solutions",
      description: "Professional WordPress development with custom themes, plugins, and AI-powered features tailored to your needs.",
      features: ["Custom themes", "Plugin development", "AI integrations"],
      order: 2,
    },
    {
      id: "3",
      icon: "Plug",
      title: "API Integration & Development",
      description: "Seamless connections between your existing tools and new services via robust API integrations.",
      features: ["REST & GraphQL", "Webhooks", "Real-time sync"],
      order: 3,
    },
    {
      id: "4",
      icon: "Bot",
      title: "Custom AI Chatbot Development",
      description: "Intelligent conversational agents that handle customer support, lead generation, and internal queries.",
      features: ["Natural language processing", "Context awareness", "Multi-platform"],
      order: 4,
    },
    {
      id: "5",
      icon: "Sparkles",
      title: "Prompt Engineering Services",
      description: "Expert prompt design and optimization for AI models to maximize output quality and efficiency.",
      features: ["Custom prompts", "Output optimization", "Model fine-tuning"],
      order: 5,
    },
    {
      id: "6",
      icon: "Lightbulb",
      title: "End-to-End AI Solutions",
      description: "Complete AI solution design from concept to deployment, tailored to your specific business needs.",
      features: ["Strategy consulting", "Implementation", "Ongoing support"],
      order: 6,
    },
  ],
  contact: {
    email: "jisunahamed525@gmail.com",
    location: "Available Worldwide (Remote)",
    socialLinks: [
      { id: "1", platform: "GitHub", url: "https://github.com", icon: "Github", visible: true },
      { id: "2", platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", visible: true },
      { id: "3", platform: "Twitter", url: "https://twitter.com", icon: "Twitter", visible: true },
      { id: "4", platform: "Facebook", url: "https://facebook.com", icon: "Facebook", visible: false },
      { id: "5", platform: "WhatsApp", url: "https://wa.me/", icon: "MessageCircle", visible: false },
    ],
  },
  chatSettings: {
    webhookUrl: "",
    enabled: true,
    welcomeMessage: "Hey! 👋 I'm Jisun's AI assistant. How can I help you learn about AI automation services today?",
    botName: "AI Assistant",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Jisun Ahamed. All rights reserved.`,
    tagline: "Powered by AI & Innovation",
    logoText: "<Jisun.AI />",
  },
  faq: [
    {
      id: "1",
      category: "General",
      icon: "HelpCircle",
      questions: [
        { question: "Who is Jisun Ahamed?", answer: "Jisun Ahamed is a professional AI Automation Specialist from Bangladesh who helps businesses worldwide implement intelligent automation solutions using n8n, AI chatbots, WordPress, and API integrations. With 50+ successful projects and 5+ years of experience, Jisun specializes in creating automated workflows that save businesses 20+ hours per week." },
        { question: "What is AI Automation and why do I need it?", answer: "AI Automation combines artificial intelligence with workflow automation to handle repetitive tasks, make intelligent decisions, and improve business efficiency. Jisun Ahamed specializes in implementing these solutions to help businesses save time, reduce costs by up to 60%, and scale operations without increasing headcount." },
        { question: "What services does Jisun Ahamed provide?", answer: "Jisun provides comprehensive AI automation services including: n8n workflow automation, custom chatbot development using GPT-4 and Claude, WordPress automation and integration, API integration and development, prompt engineering services, and end-to-end AI solution implementation for businesses of all sizes." }
      ]
    },
    {
      id: "2",
      category: "n8n & Automation",
      icon: "Wrench",
      questions: [
        { question: "What is n8n and why should I use it?", answer: "n8n is a powerful workflow automation platform that Jisun specializes in. It allows connecting different apps and services, creating intelligent workflows, and automating business processes. Unlike other platforms, n8n is open-source, self-hostable, and highly customizable." },
        { question: "Who can build me a custom n8n workflow?", answer: "Jisun Ahamed is an n8n expert who builds custom workflows, complex integrations, and intelligent automation systems. Having completed 50+ successful automation projects, Jisun can create n8n workflows that connect multiple platforms, automate data processing, and integrate AI capabilities." }
      ]
    },
    {
      id: "3",
      category: "Chatbot Development",
      icon: "MessageCircle",
      questions: [
        { question: "Can you build a chatbot for my business?", answer: "Yes! Jisun builds custom AI chatbots for various platforms including websites, WhatsApp, Telegram, Discord, and more. Chatbots can handle customer support (80% auto-resolution rate), lead generation, appointment booking, and much more." },
        { question: "What platforms can chatbots be deployed on?", answer: "Jisun develops chatbots for multiple platforms including website live chat, WhatsApp Business, Telegram, Discord, Facebook Messenger, and custom mobile apps." }
      ]
    },
    {
      id: "4",
      category: "Pricing",
      icon: "DollarSign",
      questions: [
        { question: "How much do AI automation services cost?", answer: "Project costs vary based on complexity. Simple automations: $500-$1,500. Medium complexity projects: $1,500-$5,000. Complex enterprise solutions: $5,000+. Jisun offers free initial consultations." },
        { question: "What's included in the pricing?", answer: "All projects include development, testing, comprehensive documentation, team training, and 30 days of post-launch support. Extended support packages are available." }
      ]
    },
    {
      id: "5",
      category: "Timeline & Process",
      icon: "Clock",
      questions: [
        { question: "What's the typical project timeline?", answer: "Simple automation projects: 1-2 weeks. Medium complexity projects: 2-4 weeks. Complex enterprise solutions: 1-3 months." },
        { question: "Do you provide ongoing support?", answer: "Yes! Jisun provides comprehensive support including bug fixes, updates, optimization, and training for your team. All projects include 30 days of post-launch support." }
      ]
    },
    {
      id: "6",
      category: "Working Together",
      icon: "Globe",
      questions: [
        { question: "Do you work with international clients?", answer: "Absolutely! Jisun works with clients worldwide and communicates fluently in English and Bengali. Remote collaboration is seamless with modern tools." },
        { question: "How do I get started with a project?", answer: "Getting started is easy: 1) Contact Jisun for a free consultation, 2) Discuss your needs and receive a detailed proposal, 3) Approve the project scope, 4) Development begins with regular updates, 5) Testing, training, and launch." }
      ]
    }
  ],
};
