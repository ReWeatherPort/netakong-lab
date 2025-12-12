'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Beaker } from 'lucide-react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';
import { blogPosts } from '@/data/blog-posts';
import { labNotes } from '@/data/lab-notes';

type SearchResult = {
  type: 'blog' | 'lab-note';
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
};

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  // Prepare search data
  const searchData: SearchResult[] = [
    ...blogPosts.map(post => ({
      type: 'blog' as const,
      slug: post.slug,
      title: language === 'zh-TW' ? post.titleZh : post.title,
      excerpt: language === 'zh-TW' ? post.excerptZh : post.excerpt,
      tags: post.tags,
      date: post.date,
    })),
    ...labNotes.map(note => ({
      type: 'lab-note' as const,
      slug: note.slug,
      title: language === 'zh-TW' ? note.titleZh : note.title,
      excerpt: language === 'zh-TW' ? note.summaryZh : note.summary,
      tags: note.tags,
      date: note.date,
    })),
  ];

  // Configure Fuse.js
  const fuse = new Fuse(searchData, {
    keys: ['title', 'excerpt', 'tags'],
    threshold: 0.3,
    includeScore: true,
  });

  // Handle search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(query).slice(0, 8);
    setResults(searchResults.map(result => result.item));
  }, [query, language]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcuts (Cmd/Ctrl + K)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">{language === 'zh-TW' ? '搜尋' : 'Search'}</span>
        <kbd className="hidden md:inline px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm pt-[10vh]">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'zh-TW' ? '搜尋文章、實驗室筆記...' : 'Search posts, lab notes...'}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <kbd className="px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
                ESC
              </kbd>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                  {language === 'zh-TW' ? '找不到結果' : 'No results found'}
                </div>
              )}

              {results.length > 0 && (
                <div className="py-2">
                  {results.map((result) => (
                    <Link
                      key={`${result.type}-${result.slug}`}
                      href={result.type === 'blog' ? `/blog/${result.slug}` : `/lab-notes/${result.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="mt-1">
                        {result.type === 'blog' ? (
                          <FileText className="w-5 h-5 text-blue-500" />
                        ) : (
                          <Beaker className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {result.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {result.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            {new Date(result.date).toLocaleDateString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <div className="flex gap-1.5">
                            {result.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!query && (
                <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {language === 'zh-TW' 
                    ? '輸入關鍵字搜尋文章和實驗室筆記...' 
                    : 'Type to search posts and lab notes...'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
