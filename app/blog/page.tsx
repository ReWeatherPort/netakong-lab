'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Blog posts data - you can move this to a separate file later
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Polymarket Analysis',
    titleZh: '開始使用 Polymarket 分析',
    excerpt: 'A comprehensive guide to analyzing prediction markets and finding profitable opportunities.',
    excerptZh: '全面指南：分析預測市場並找到盈利機會。',
    date: '2024-12-10',
    readTime: '5 min read',
    category: 'Trading',
    categoryZh: '交易',
    slug: 'polymarket-analysis-guide',
  },
  {
    id: 2,
    title: 'Building Automated Trading Bots with Freqtrade',
    titleZh: '使用 Freqtrade 構建自動交易機器人',
    excerpt: 'Learn how to create, backtest, and deploy algorithmic trading strategies.',
    excerptZh: '學習如何創建、回測和部署算法交易策略。',
    date: '2024-12-05',
    readTime: '8 min read',
    category: 'Automation',
    categoryZh: '自動化',
    slug: 'freqtrade-trading-bots',
  },
  {
    id: 3,
    title: 'Data Science Tools for Market Analysis',
    titleZh: '市場分析的數據科學工具',
    excerpt: 'Essential Python libraries and techniques for analyzing financial data.',
    excerptZh: '分析金融數據的基本 Python 庫和技術。',
    date: '2024-11-28',
    readTime: '6 min read',
    category: 'Data Science',
    categoryZh: '數據科學',
    slug: 'data-science-market-analysis',
  },
];

export default function BlogPage() {
  const { t, language } = useLanguage();

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
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 space-y-4">
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {language === 'en' ? post.category : post.categoryZh}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {language === 'en' ? post.title : post.titleZh}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {language === 'en' ? post.excerpt : post.excerptZh}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
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
