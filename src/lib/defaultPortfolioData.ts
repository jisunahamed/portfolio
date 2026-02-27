import { PortfolioData } from "./portfolioTypes";

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Jisun Ahamed",
    photoUrl: "https://i.ibb.co.com/7JGw9jHt/Picsart-25-10-15-13-11-26-300.jpg",
    subtitle: "AI Automation Specialist | Transforming Ideas into Intelligent Solutions",
    techStack: [
      "AI Automation",
      "n8n",
      "WordPress",
      "API Integration",
      "Prompt Engineering"
    ],
    ctaPrimary: "Start a Conversation",
    description: "I craft intelligent automation systems that save time, reduce errors, and scale your business. Specializing in AI workflows, WordPress development, and custom API integrations.",
    ctaSecondary: "View My Work"
  },
  about: {
    bio: "With expertise in n8n workflow automation, GPT-4 and Claude AI integration, WordPress development, and custom API solutions, I help businesses streamline their operations, reduce costs by up to 60%, and unlock the power of artificial intelligence. Having completed 50+ successful automation projects, I have helped clients save 15-25 hours per week and achieve ROI within 2-3 months.",
    stats: [
      {
        label: "Years Experience",
        value: "2+"
      },
      {
        label: "Projects Delivered",
        value: "50+"
      },
      {
        label: "Automations Built",
        value: "200+"
      },
      {
        label: "Happy Clients",
        value: "30+"
      }
    ],
    skills: [
      {
        id: "1",
        icon: "n8n",
        name: "AI Automation",
        color: "primary"
      },
      {
        id: "2",
        icon: "Api",
        name: "Vibe Codeing",
        color: "secondary"
      },
      {
        id: "3",
        icon: "Python ",
        name: "API Integration",
        color: "accent"
      },
      {
        id: "4",
        icon: "JavaScript ",
        name: "Prompt Engineering",
        color: "primary"
      },
      {
        id: "5",
        icon: "Lightbulb",
        name: "AI Solution Provider",
        color: "secondary"
      }
    ],
    mission: "My mission is to make AI accessible and practical for businesses of all sizes, from startups to enterprises. Through innovative automation solutions using n8n, custom chatbots, and intelligent integrations, I bridge the gap between cutting-edge AI technology and real-world business needs. Based in Bangladesh, I serve clients worldwide with a 24-hour response time and 98% satisfaction rate.",
    photoUrl: "https://i.ibb.co.com/7JGw9jHt/Picsart-25-10-15-13-11-26-300.jpg",
    experience: [
      {
        id: "1",
        year: "2024 - Present",
        title: "AI Automation Specialist",
        description: "Focusing 100% on n8n workflows and AI Agents for US/UK clients.",
        order: 1
      },
      {
        id: "2",
        year: "2022 - 2023",
        title: "Full Stack Developer",
        description: "Built web applications and integrated APIs, laying the foundation for complex automation logic.",
        order: 2
      },
      {
        id: "3",
        year: "2020 - 2021",
        title: "WordPress Specialist",
        description: "Mastered the art of CMS and plugin integrations.",
        order: 3
      }
    ]
  },
  projects: [
    {
      id: "1770832134577",
      tags: [
        "n8n",
        "Custom API",
        "js"
      ],
      image: "https://res.cloudinary.com/dnqzmx3ag/image/upload/v1770744622/inmetech_uploads/xnd8jcd21kpy098rvkol.png",
      order: 1,
      title: "AI Chatbot Development",
      category: "ai-automation",
      status: "published",
      description: "This project involved building an advanced AI automation system for Education & Migration Service (WEMS) to manage lead generation and student support on Facebook Messenger and WhatsApp 24/7. The system uses natural language processing, contextual awareness, and RAG technology to deliver accurate, human-like responses based strictly on verified client data. It captures student information during conversations, analyzes voice notes and images, and automatically syncs qualified leads to the CRM—creating a seamless, intelligent, and scalable solution that improves engagement and conversion rates.",
      fullDescription: "This project involved the development of an advanced AI automation system for Education & Migration Service (WEMS), designed to handle lead generation and student support across Facebook Messenger and WhatsApp 24/7. The system delivers human-like conversational experiences using natural language processing and contextual awareness, allowing it to understand complex queries, correct user input, and respond accurately based on conversation history. It integrates voice note and image analysis to process documents and screenshots shared by students, while Retrieval-Augmented Generation (RAG) ensures that all responses are generated strictly from verified, client-provided data. The automation strategically captures student information such as names and phone numbers during conversations and instantly syncs qualified leads with the client’s CRM. To enhance user experience, the system includes human-behavior indicators like typing status and read receipts, resulting in a seamless, intelligent, and scalable automation solution that improves engagement, operational efficiency, and lead conversion."
    },
    {
      id: "1770832270149",
      tags: [
        "React",
        "n8n",
        "postgres"
      ],
      image: "https://res.cloudinary.com/dnqzmx3ag/image/upload/v1770831782/inmetech_uploads/vx0ub4xulurbhje7je6l.png",
      order: 2,
      title: "Go-inmeTech",
      category: "ai-automation",
      status: "published",
      description: "InmeTech AI (go.inmetech.com) is a subscription-based automation platform that helps businesses manage Facebook Pages and customer conversations 24/7. It provides instant replies, automated order management, lead capture, and smart engagement without any coding. Powered by advanced AI and workflow automation, the system understands customer intent, responds naturally, and handles repetitive tasks automatically. With continuous updates, reliable hosting, and performance optimization, InmeTech AI enables businesses to scale efficiently while improving customer support and boosting conversions.",
      fullDescription: "InmeTech AI https://go.inmetech.com is a subscription-based automation platform designed to help businesses manage their Facebook Pages and customer conversations effortlessly. The system operates 24/7, providing instant replies, automated order management, lead capture, and smart customer engagement without requiring any coding knowledge. Built with advanced AI and workflow automation, the platform understands customer intent, responds naturally, and handles repetitive tasks automatically. From replying to comments and messages to collecting customer data and creating orders, everything runs through intelligent automation designed to increase efficiency and boost sales. The monthly service model ensures continuous updates, performance optimization, and reliable hosting, so businesses can focus on growth while InmeTech AI handles communication and operational workflows in the background. It is a scalable solution ideal for e-commerce brands, service providers, and online businesses looking to automate customer support and maximize conversions."
    },
    {
      id: "1770832519388",
      tags: [
        "nodejs",
        "postgres",
        "cloudinary"
      ],
      image: "https://i.ibb.co.com/kghnKMtd/Screenshot-2026-02-11-234739.png",
      order: 3,
      title: "InmeTech",
      category: "others",
      status: "published",
      description: "InmeTech is a results-driven AI automation agency specializing in Custom Automation, Lead Generation, and AI Chatbot Development.\nWe help businesses streamline operations, capture high-quality leads, and automate customer interactions using intelligent workflows and advanced AI systems. Our solutions are scalable, efficient, and built to drive measurable growth.",
      fullDescription: "InmeTech is a modern AI automation agency focused on building intelligent, high-performance digital systems for growing businesses. We specialize in Custom Automation, Lead Generation, and AI Chatbot Development, helping companies eliminate repetitive tasks, streamline workflows, and maximize operational efficiency.\n\nOur approach combines advanced AI models, workflow automation (including n8n-based systems), and smart integrations to create scalable solutions tailored to each client’s unique business needs. From automated lead capture and CRM synchronization to 24/7 AI-powered chat support and sales automation, we design systems that work continuously in the background—so businesses can focus on strategy and growth.\n\nAt InmeTech, we don’t just build tools—we engineer automation ecosystems that increase engagement, improve conversion rates, and unlock long-term scalability. Our mission is simple: transform complex processes into intelligent, revenue-driving systems."
    }
  ],
  services: [
    {
      id: "1",
      icon: "Workflow",
      order: 1,
      title: "AI Workflow Automation",
      features: [
        "Multi-step automations",
        "Error handling",
        "Scheduled triggers"
      ],
      description: "Custom workflows using n8n, Make, and Zapier that connect your apps, automate repetitive tasks, and streamline operations."
    },
    {
      id: "2",
      icon: "Globe",
      order: 2,
      title: "Vibe Code Project",
      features: [
        "Custom themes",
        "development",
        "AI integrations"
      ],
      description: "Professional system development with custom requirements and AI-powered features tailored to your needs."
    },
    {
      id: "3",
      icon: "Plug",
      order: 3,
      title: "API Integration & Development",
      features: [
        "REST & GraphQL",
        "Webhooks",
        "Real-time sync"
      ],
      description: "Seamless connections between your existing tools and new services via robust API integrations."
    },
    {
      id: "4",
      icon: "Bot",
      order: 4,
      title: "Custom AI Chatbot Development",
      features: [
        "Natural language processing",
        "Context awareness",
        "Multi-platform"
      ],
      description: "Intelligent conversational agents that handle customer support, lead generation, and internal queries."
    },
    {
      id: "5",
      icon: "Sparkles",
      order: 5,
      title: "Prompt Engineering Services",
      features: [
        "Custom prompts",
        "Output optimization",
        "Model fine-tuning"
      ],
      description: "Expert prompt design and optimization for AI models to maximize output quality and efficiency."
    },
    {
      id: "6",
      icon: "Lightbulb",
      order: 6,
      title: "End-to-End AI Solutions",
      features: [
        "Strategy consulting",
        "Implementation",
        "Ongoing support"
      ],
      description: "Complete AI solution design from concept to deployment, tailored to your specific business needs."
    }
  ],
  contact: {
    email: "jisunahamed525@gmail.com",
    location: "Available Worldwide (Remote)",
    socialLinks: [
      {
        id: "1",
        url: "https://github.com",
        icon: "Github",
        visible: true,
        platform: "GitHub"
      },
      {
        id: "2",
        url: "https://linkedin.com",
        icon: "Linkedin",
        visible: true,
        platform: "LinkedIn"
      },
      {
        id: "3",
        url: "https://twitter.com",
        icon: "Twitter",
        visible: true,
        platform: "Twitter"
      },
      {
        id: "4",
        url: "https://facebook.com",
        icon: "Facebook",
        visible: false,
        platform: "Facebook"
      },
      {
        id: "5",
        url: "https://wa.me/",
        icon: "MessageCircle",
        visible: false,
        platform: "WhatsApp"
      }
    ]
  },
  chatSettings: {
    botName: "AI Assistant",
    enabled: true,
    webhookUrl: "https://n8n.srv1171885.hstgr.cloud/webhook/Oh,no",
    welcomeMessage: "Hey! 👋 I am Jisun AI assistant. How can I help you learn about AI automation services today?"
  },
  footer: {
    tagline: "Powered by AI & Innovation",
    logoText: "<Jisun.AI />",
    copyright: "© 2025 Jisun Ahamed. All rights reserved."
  },
  faq: [
    {
      id: "services",
      category: "Services",
      icon: "Sparkles",
      questions: [
        {
          question: "What exactly can you automate for my business?",
          answer: "Almost any repetitive digital task. Common examples include: synchronizing data between apps (e.g., Airtable to QuickBooks), automatically qualifying leads from forms, scraping data from websites for market research, and building custom AI chatbots for customer support."
        },
        {
          question: "Do you only work with n8n?",
          answer: "n8n is my tool of choice for its power and flexibility, allowing for complex, self-hosted workflows. However, I also have experience with Make.com (formerly Integromat) and Zapier. I recommend n8n because it gives you full ownership of your data and workflows."
        },
        {
          question: "Do I need to pay for software subscriptions?",
          answer: "It depends on the complexity. For n8n, you can self-host it for roughly $20/month (vs $100s for Zapier). You will need to pay for the API usage of tools like OpenAI (ChatGPT) or Anthropic, but these are usually very affordable (often <$10/month for moderate use)."
        }
      ]
    },
    {
      id: "process",
      category: "Process",
      icon: "Zap",
      questions: [
        {
          question: "How long does it take to build a workflow?",
          answer: "Simple automations (like a lead notification system) can be done in 1-2 days. Complex AI agents or full business logic integrations typically take 1-2 weeks, including testing and refinement."
        },
        {
          question: "What happens if an automation breaks?",
          answer: "I build robust error handling into every workflow. If something fails (e.g., an API goes down), you get an instant notification. I also offer a 30-day support window after handover to fix any bugs for free."
        }
      ]
    },
    {
      id: "security",
      category: "Data & Security",
      icon: "Shield",
      questions: [
        {
          question: "Is my data safe?",
          answer: "Absolutely. With n8n self-hosting, your data never leaves your server. Unlike closed platforms where your data sits on their servers, you maintain 100% data sovereignty. I follow strict security best practices when handling API keys and credentials."
        },
        {
          question: "Do you offer maintenance plans?",
          answer: "Yes. After the initial 30-day support period, I offer retainer packages for ongoing monitoring, updates, and building new features as your business grows."
        }
      ]
    }
  ],
  clients: [
    {
      id: "1",
      name: "WEMS",
      logo: "https://wems.com.bd/wp-content/uploads/2023/06/wems-logo.png",
      url: "https://wems.com.bd",
      visible: true,
      order: 1
    },
    {
      id: "2",
      name: "InmeTech",
      logo: "https://res.cloudinary.com/dnqzmx3ag/image/upload/v1770831782/inmetech_uploads/vx0ub4xulurbhje7je6l.png",
      url: "https://inmetech.com",
      visible: true,
      order: 2
    }
  ]
};
