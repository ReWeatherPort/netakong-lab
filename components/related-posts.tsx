'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { BlogPost } from '@/data/blog-posts';
import { LabNote } from '@/data/lab-notes';

type RelatedItem = BlogPost | LabNote;

type RelatedPostsProps = {
  currentSlug: string;
  currentTags: string[];
  items: RelatedItem[];
  type: 'blog' | 'lab-note';
};

export default function RelatedPosts({ currentSlug, currentTags, items, type }: RelatedPostsProps) {
  const { language } = useLanguage();

  // Calculate relevance score based on matching tags
  const relatedItems = items
    .filter(item => item.slug !== currentSlug)
    .map(item => {
      const matchingTags = item.tags.filter(tag => currentTags.includes(tag));
      return {
        ...item,
        score: matchingTags.length,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (relatedItems.length === 0) return null;

  const basePath = type === 'blog' ? '/blog' : '/lab-notes';
  const title = language === 'zh-TW' 
    ? (type === 'blog' ? '相關文章' : '相關筆記')
    : (type === 'blog' ? 'Related Posts' : 'Related Notes');

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 font-tech text-tech-gradient">
        {title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedItems.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group block p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {language === 'zh-TW' ? item.titleZh : item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {language === 'zh-TW' 
                ? ('excerptZh' in item ? item.excerptZh : item.summaryZh)
                : ('excerpt' in item ? item.excerpt : item.summary)}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <time>
                  {new Date(item.date).toLocaleDateString(language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.readTime}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
