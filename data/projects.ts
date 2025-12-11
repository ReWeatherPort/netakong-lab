import { Project, ProjectStatus } from '@/lib/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Polymarket AI Lab',
    slug: 'polymarket-ai-lab',
    description: 'Hugo static site showcasing Polymarket experiments, prediction market analysis, and AI-driven trading insights.',
    longDescription: 'A comprehensive research hub for exploring prediction markets through the lens of AI and data science. Features automated market analysis, probability modeling, and experimental trading strategies.',
    techStack: ['Hugo', 'JavaScript', 'Python', 'AI/ML'],
    tags: ['polymarket', 'crypto', 'ai', 'data-science', 'trading'],
    status: 'Live',
    timeline: '2024 - Present',
    links: {
      github: 'https://github.com/username/polymarket-ai-lab',
      live: 'https://polymarket-ai-lab.netlify.app'
    },
    featured: true
  },
  {
    id: '2',
    title: 'HK Job Worth Calculator',
    slug: 'hk-job-worth-calculator',
    description: 'Interactive tool calculating real job value using purchasing power parity (PPP) concepts for Hong Kong market.',
    longDescription: 'Helps job seekers understand true compensation value by factoring in cost of living, taxes, benefits, and purchasing power differences across regions.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    tags: ['web-development', 'data-science', 'nodejs', 'automation'],
    status: 'Live',
    timeline: '2024',
    links: {
      github: 'https://github.com/username/hk-job-worth-calculator',
      live: 'https://hk-job-calculator.vercel.app'
    },
    featured: true
  },
  {
    id: '3',
    title: 'Freqtrade Strategies',
    slug: 'freqtrade-strategies',
    description: 'Algorithmic trading strategies and backtesting framework for cryptocurrency markets using Freqtrade.',
    longDescription: 'Collection of quantitative trading strategies with comprehensive backtests, risk management protocols, and automated execution pipelines.',
    techStack: ['Python', 'Freqtrade', 'Pandas', 'TA-Lib'],
    tags: ['trading', 'crypto', 'automation', 'data-science', 'python'],
    status: 'WIP',
    timeline: '2023 - Present',
    links: {
      github: 'https://github.com/username/freqtrade-strategies'
    },
    featured: true
  },
  {
    id: '4',
    title: 'Profile Site',
    slug: 'profile-site',
    description: 'GitHub Pages portfolio showcasing projects, skills, and professional experience.',
    longDescription: 'Clean, minimal portfolio site hosted on GitHub Pages with project galleries and case studies.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    tags: ['web-development', 'design'],
    status: 'Live',
    timeline: '2023',
    links: {
      github: 'https://github.com/username/username.github.io',
      live: 'https://username.github.io'
    },
    featured: false
  },
  {
    id: '5',
    title: 'netakong_nttainment',
    slug: 'netakong-nttainment',
    description: 'Instagram content brand combining entertainment, finance insights, and creative storytelling.',
    longDescription: 'Multi-format content platform exploring markets, tech, and culture through engaging visual narratives and data-driven stories.',
    techStack: ['Instagram', 'Content Strategy', 'Design'],
    tags: ['content', 'social-media', 'design'],
    status: 'Live',
    timeline: '2024 - Present',
    links: {
      live: 'https://instagram.com/netakong_nttainment'
    },
    featured: true
  },
  {
    id: '6',
    title: 'Polymarket Analysis Dashboard',
    slug: 'polymarket-analysis',
    description: 'Real-time analytics dashboard for tracking prediction market trends, liquidity flows, and probability shifts.',
    longDescription: 'Comprehensive analytics platform aggregating market data, sentiment analysis, and predictive modeling for informed trading decisions.',
    techStack: ['Python', 'Streamlit', 'Plotly', 'APIs'],
    tags: ['polymarket', 'data-science', 'automation', 'python'],
    status: 'WIP',
    timeline: '2024 - Present',
    links: {},
    featured: true
  },
  {
    id: '7',
    title: 'Crypto Treasury Management',
    slug: 'crypto-treasury',
    description: 'Risk management framework and tools for crypto treasury operations, portfolio tracking, and yield optimization.',
    longDescription: 'Enterprise-grade treasury management system with DeFi integration, risk modeling, and automated rebalancing strategies.',
    techStack: ['Python', 'Web3', 'Excel', 'Analytics'],
    tags: ['crypto', 'trading', 'data-science', 'automation'],
    status: 'WIP',
    timeline: '2023 - Present',
    links: {},
    featured: false
  },
  {
    id: '8',
    title: 'Kaggle Data Science Projects',
    slug: 'kaggle-projects',
    description: 'Competition notebooks and exploratory data analysis projects covering ML, time series, and NLP challenges.',
    longDescription: 'Portfolio of data science work including predictive modeling, feature engineering, and advanced analytics across diverse domains.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'PyTorch'],
    tags: ['data-science', 'ai', 'python', 'machine-learning'],
    status: 'Live',
    timeline: '2022 - Present',
    links: {
      live: 'https://kaggle.com/username'
    },
    featured: false
  },
  {
    id: '9',
    title: 'Web Scraping & Automation Suite',
    slug: 'web-scraping-suite',
    description: 'Collection of web scraping tools and automation workflows for data collection, monitoring, and processing.',
    longDescription: 'Scalable scraping infrastructure with anti-detection measures, proxy rotation, and automated data pipelines for market research and competitive analysis.',
    techStack: ['Python', 'Selenium', 'BeautifulSoup', 'Scrapy', 'n8n'],
    tags: ['web-scraping', 'automation', 'python', 'nodejs'],
    status: 'WIP',
    timeline: '2023 - Present',
    links: {},
    featured: false
  },
  {
    id: '10',
    title: 'AI Content Generation Pipeline',
    slug: 'ai-content-pipeline',
    description: 'Automated content generation workflow using n8n, GPT models, and multi-channel publishing.',
    longDescription: 'End-to-end automation for research, content creation, editing, and distribution across social media and blog platforms.',
    techStack: ['n8n', 'OpenAI API', 'Python', 'Node.js'],
    tags: ['ai', 'automation', 'nodejs', 'content'],
    status: 'Idea',
    timeline: '2025',
    links: {},
    featured: false
  }
];

// Utility functions
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const filterProjects = (
  searchQuery: string,
  selectedTags: string[],
  statusFilter?: ProjectStatus
): Project[] => {
  return projects.filter(project => {
    const matchesSearch = 
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.every(tag => project.tags.includes(tag));
    
    const matchesStatus = 
      !statusFilter ||
      project.status === statusFilter;
    
    return matchesSearch && matchesTags && matchesStatus;
  });
};
