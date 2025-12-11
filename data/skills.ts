import { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'markets-crypto',
    title: 'Markets & Crypto',
    icon: '📈',
    skills: [
      {
        name: 'Polymarket & Prediction Markets',
        description: 'Market analysis, probability modeling, trading strategies',
        proficiency: 'Expert'
      },
      {
        name: 'Crypto Treasury Management',
        description: 'Portfolio management, risk assessment, DeFi protocols',
        proficiency: 'Advanced'
      },
      {
        name: 'Algorithmic Trading',
        description: 'Freqtrade strategies, backtesting, automated execution',
        proficiency: 'Advanced'
      },
      {
        name: 'Risk Management',
        description: 'Position sizing, hedging strategies, portfolio optimization',
        proficiency: 'Advanced'
      }
    ]
  },
  {
    id: 'data-ml',
    title: 'Data & Machine Learning',
    icon: '🤖',
    skills: [
      {
        name: 'Python Data Science',
        description: 'Pandas, NumPy, Scikit-learn, data analysis pipelines',
        proficiency: 'Expert'
      },
      {
        name: 'Machine Learning',
        description: 'Predictive modeling, feature engineering, XGBoost, PyTorch',
        proficiency: 'Advanced'
      },
      {
        name: 'Kaggle Competitions',
        description: 'Time series, NLP, computer vision challenges',
        proficiency: 'Advanced'
      },
      {
        name: 'Analytics Dashboards',
        description: 'Streamlit, Plotly, data visualization, reporting',
        proficiency: 'Expert'
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: '💻',
    skills: [
      {
        name: 'Next.js & React',
        description: 'App Router, Server Components, TypeScript, modern React patterns',
        proficiency: 'Expert'
      },
      {
        name: 'Node.js',
        description: 'Backend APIs, serverless functions, full-stack development',
        proficiency: 'Advanced'
      },
      {
        name: 'Tailwind CSS',
        description: 'Responsive design, component libraries, design systems',
        proficiency: 'Expert'
      },
      {
        name: 'Static Site Generators',
        description: 'Hugo, GitHub Pages, JAMstack architecture',
        proficiency: 'Advanced'
      },
      {
        name: 'UI/UX Design',
        description: 'Product design, user research, prototyping',
        proficiency: 'Advanced'
      }
    ]
  },
  {
    id: 'automation-agents',
    title: 'Automation & AI Agents',
    icon: '🔧',
    skills: [
      {
        name: 'n8n Workflows',
        description: 'Complex automation, API integrations, data pipelines',
        proficiency: 'Expert'
      },
      {
        name: 'Web Scraping',
        description: 'Selenium, BeautifulSoup, Scrapy, anti-detection techniques',
        proficiency: 'Advanced'
      },
      {
        name: 'AI Agents',
        description: 'LangChain, autonomous agents, prompt engineering',
        proficiency: 'Advanced'
      },
      {
        name: 'Content Generation',
        description: 'GPT integration, automated writing, multi-channel publishing',
        proficiency: 'Advanced'
      },
      {
        name: 'API Development',
        description: 'REST APIs, webhooks, third-party integrations',
        proficiency: 'Advanced'
      }
    ]
  }
];

export const getSkillsByCategory = (categoryId: string): SkillCategory | undefined => {
  return skillCategories.find(cat => cat.id === categoryId);
};
