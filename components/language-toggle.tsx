'use client';

import { useLanguage } from '@/components/language-provider';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800" />;
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-TW' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
      title={language === 'en' ? 'Switch to 繁體中文' : 'Switch to English'}
    >
      <div className="flex items-center gap-1">
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {language === 'en' ? 'EN' : '繁'}
        </span>
      </div>
    </button>
  );
}
