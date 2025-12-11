'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    
    // Home
    'hero.badge': 'Shipping Projects, Building Systems',
    'hero.tagline': 'Building tools for crypto analysis, trading automation, and data-driven decision making. From Polymarket analytics to Kaggle competitions.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Work with Me',
    'home.featured.subtitle': 'Featured Work',
    'home.featured.title': 'Recent Projects',
    'home.featured.description': 'A selection of experiments, tools, and products I\'ve built across markets, data, and web.',
    'home.viewAll': 'View all projects',
    'home.instagram.title': 'Follow the Journey',
    'home.instagram.description': 'Behind-the-scenes content, market insights, and creative experiments on Instagram',
    
    // Focus Areas
    'focus.polymarket': 'Polymarket / Crypto Analysis',
    'focus.polymarket.desc': 'Prediction markets, trading strategies, treasury management',
    'focus.trading': 'Freqtrade / Trading',
    'focus.trading.desc': 'Algorithmic trading strategies and automated execution',
    'focus.datascience': 'Data Science & Kaggle',
    'focus.datascience.desc': 'ML models, analytics dashboards, competitive data science',
    'focus.webdev': 'Web Development',
    'focus.webdev.desc': 'Next.js, React, Hugo - building products that ship',
    
    // Projects
    'projects.title': 'All Projects',
    'projects.subtitle': 'Portfolio',
    'projects.desc': 'A comprehensive collection of experiments, tools, and products across markets, data science, and web development.',
    'projects.search': 'Search projects...',
    'projects.status': 'Status:',
    'projects.all': 'All',
    'projects.live': 'Live',
    'projects.wip': 'WIP',
    'projects.idea': 'Idea',
    'projects.sort': 'Sort by:',
    'projects.featured': 'Featured First',
    'projects.newest': 'Newest',
    'projects.name': 'Name (A-Z)',
    'projects.filter': 'Filter by tags:',
    'projects.clear': 'Clear all',
    'projects.showing': 'Showing',
    'projects.of': 'of',
    'projects.results': 'projects',
    'projects.noResults': 'No projects found matching your filters.',
    'projects.clearFilters': 'Clear all filters',
    
    // Skills
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'Capabilities',
    'skills.desc': 'A multidisciplinary toolkit spanning markets, data, automation, and product development.',
    'skills.mindset': 'The Lab Mindset',
    'skills.mindset.p1': 'Every project is an experiment. The goal isn\'t just to build—it\'s to',
    'skills.mindset.p1.bold': 'measure, iterate, and ship.',
    
    // Contact
    'contact.title': 'Let\'s Work Together',
    'contact.subtitle': 'Get in Touch',
    'contact.desc': 'Have a project in mind? Want to collaborate on markets, data, or web development? Drop me a message.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message Sent!',
    'contact.connect': 'Connect on Social',
    'contact.response': 'Response time:',
    'contact.response.desc': 'I typically respond within 24-48 hours. For urgent inquiries, reach out via email directly.',
    
    // Footer
    'footer.tagline': 'Turning markets, data, and content into experiments that actually ship.',
    'footer.links': 'Quick Links',
    'footer.social': 'Connect',
    'footer.copyright': 'NetaKong Lab. Built with Next.js, TypeScript & Tailwind CSS.',
  },
  'zh-TW': {
    // Navigation
    'nav.home': '首頁',
    'nav.projects': '專案',
    'nav.skills': '技能',
    'nav.about': '關於',
    'nav.contact': '聯繫',
    'nav.blog': '部落格',
    
    // Home
    'home.welcome': '歡迎來到實驗室',
    'home.title': 'NetaKong Lab',
    'home.tagline': '將市場、數據和內容轉化為',
    'home.tagline2': '真正能發布的實驗成果',
    'home.cta.projects': '查看專案',
    'hero.badge': '發布專案，建立系統',
    'hero.tagline': '構建加密貨幣分析、交易自動化和數據驅動決策的工具。從 Polymarket 分析到 Kaggle 競賽。',
    'hero.viewProjects': '查看專案',
    'hero.contact': '與我合作',
    'home.featured.subtitle': '精選作品',
    'home.featured.title': '最新專案',
    'home.featured.description': '精選我在市場、數據和網頁開發領域建立的實驗、工具和產品。',
    'home.viewAll': '查看所有專案',
    'home.instagram.title': '追蹤旅程',
    'home.instagram.description': '在 Instagram 上分享幕後內容、市場洞察和創意實驗',
    
    // Focus Areas
    'focus.polymarket': 'Polymarket / 加密貨幣分析',
    'focus.polymarket.desc': '預測市場、交易策略、資金管理',
    'focus.trading': 'Freqtrade / 交易',
    'focus.trading.desc': '演算法交易策略和自動執行',
    'focus.datascience': '數據科學 & Kaggle',
    'focus.datascience.desc': '機器學習模型、分析儀表板、競賽數據科學',
    'focus.webdev': '網頁開發',
    'focus.webdev.desc': 'Next.js、React、Hugo - 構建可發布的產品',
    
    // Projects
    'projects.title': '所有專案',
    'projects.subtitle': '作品集',
    'projects.desc': '涵蓋市場、數據科學和網頁開發的實驗、工具和產品的完整集合。',
    'projects.search': '搜尋專案...',
    'projects.status': '狀態：',
    'projects.all': '全部',
    'projects.live': '已上線',
    'projects.wip': '進行中',
    'projects.idea': '構想',
    'projects.sort': '排序：',
    'projects.featured': '精選優先',
    'projects.newest': '最新',
    'projects.name': '名稱 (A-Z)',
    'projects.filter': '按標籤篩選：',
    'projects.clear': '清除全部',
    'projects.showing': '顯示',
    'projects.of': '/',
    'projects.results': '個專案',
    'projects.noResults': '找不到符合篩選條件的專案。',
    'projects.clearFilters': '清除所有篩選',
    
    // Skills
    'skills.title': '技能與專長',
    'skills.subtitle': '能力',
    'skills.desc': '跨越市場、數據、自動化和產品開發的多學科工具包。',
    'skills.mindset': '實驗室思維',
    'skills.mindset.p1': '每個專案都是一次實驗。目標不僅是建立——而是',
    'skills.mindset.p1.bold': '測量、迭代、發布。',
    
    // Contact
    'contact.title': '讓我們一起合作',
    'contact.subtitle': '聯繫我',
    'contact.desc': '有專案構想？想在市場、數據或網頁開發方面合作？給我留言。',
    'contact.name': '姓名',
    'contact.email': '電子郵件',
    'contact.message': '訊息',
    'contact.send': '發送訊息',
    'contact.sending': '發送中...',
    'contact.sent': '訊息已發送！',
    'contact.connect': '社交媒體連結',
    'contact.response': '回覆時間：',
    'contact.response.desc': '我通常在 24-48 小時內回覆。如有緊急詢問，請直接透過電子郵件聯繫。',
    
    // Footer
    'footer.tagline': '將市場、數據和內容轉化為真正能發布的實驗成果。',
    'footer.links': '快速連結',
    'footer.social': '社交媒體',
    'footer.copyright': 'NetaKong Lab. 使用 Next.js、TypeScript 和 Tailwind CSS 構建。',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'zh-TW')) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
