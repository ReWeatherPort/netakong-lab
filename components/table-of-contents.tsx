'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

type Heading = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  content: string;
};

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const { language } = useLanguage();

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    
    const extractedHeadings: Heading[] = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = `heading-${index}-${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
      
      return { id, text, level };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  // Track scroll position and highlight active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      
      // Find the current heading based on scroll position
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveId(headings[i].id);
            return;
          }
        }
      }
      
      // If no heading is above the threshold, set first one
      if (headingElements.length > 0) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Add IDs to headings in the document
  useEffect(() => {
    headings.forEach(heading => {
      const elements = document.querySelectorAll('h1, h2, h3');
      elements.forEach((element, index) => {
        const text = element.textContent?.trim() || '';
        if (text === heading.text) {
          element.id = heading.id;
        }
      });
    });
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 font-tech">
          {language === 'zh-TW' ? '目錄' : 'Table of Contents'}
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={`
                block w-full text-left text-sm transition-colors py-1
                ${heading.level === 1 ? 'pl-0' : heading.level === 2 ? 'pl-4' : 'pl-8'}
                ${
                  activeId === heading.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
