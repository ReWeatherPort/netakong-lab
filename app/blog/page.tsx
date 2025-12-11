'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { getAllBlogPosts } from '@/data/blog-posts';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const blogPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', letterSpacing: '-0.02em' }}>
            {language === 'en' ? 'Lab Notes' : '實驗室筆記'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Insights on markets, data science, automation, and web development.' 
              : '關於市場、數據科學、自動化和網頁開發的見解。'}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="p-6 space-y-4">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full uppercase tracking-wider">
                    {language === 'en' ? post.category : post.categoryZh}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {language === 'en' ? post.title : post.titleZh}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                  {language === 'en' ? post.excerpt : post.excerptZh}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  {language === 'en' ? 'Read more' : '閱讀更多'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <p className="text-gray-700 dark:text-gray-300">
            {language === 'en' 
              ? '📝 More articles coming soon! Subscribe to stay updated on new posts about markets, trading, data science, and automation.' 
              : '📝 更多文章即將推出！訂閱以獲取關於市場、交易、數據科學和自動化的最新文章。'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
