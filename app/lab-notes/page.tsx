'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';
import { Calendar, Clock, ArrowRight, Tag, Beaker, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getAllLabNotes, type LabNote } from '@/data/lab-notes';

export const dynamic = 'force-dynamic';

const typeIcons = {
  experiment: Beaker,
  insight: Lightbulb,
  tutorial: BookOpen,
  analysis: TrendingUp,
};

const typeLabels = {
  en: {
    experiment: 'Experiment',
    insight: 'Insight',
    tutorial: 'Tutorial',
    analysis: 'Analysis',
  },
  'zh-TW': {
    experiment: '實驗',
    insight: '洞察',
    tutorial: '教程',
    analysis: '分析',
  },
};

export default function LabNotesPage() {
  const { t, language } = useLanguage();
  const labNotes = getAllLabNotes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4">
            <Beaker className="w-5 h-5" />
            <span className="font-semibold">{language === 'en' ? 'Lab Notes' : '實驗筆記'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Quick Experiments & Insights' : '快速實驗與洞察'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Raw notes, quick experiments, and technical insights from the lab. More informal than blog posts, optimized for rapid knowledge sharing.' 
              : '來自實驗室的原始筆記、快速實驗和技術洞察。比部落格文章更非正式，優化以快速分享知識。'}
          </p>
        </motion.div>

        {/* Lab Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {labNotes.map((note, index) => {
            const TypeIcon = typeIcons[note.type];
            const typeLabel = typeLabels[language][note.type];

            return (
              <motion.article
                key={note.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6 space-y-4">
                  {/* Type & Read Time */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 rounded-full">
                      <TypeIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{typeLabel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{note.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/lab-notes/${note.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors cursor-pointer">
                      {language === 'en' ? note.title : note.titleZh}
                    </h2>
                  </Link>

                  {/* Summary */}
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                    {language === 'en' ? note.summary : note.summaryZh}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {note.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date & Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={note.date}>
                        {new Date(note.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    <Link
                      href={`/lab-notes/${note.slug}`}
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all text-sm"
                    >
                      {language === 'en' ? 'Read note' : '閱讀筆記'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'About Lab Notes' : '關於實驗筆記'}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'en'
                  ? 'Lab Notes are quick-fire technical notes, experiments, and insights. They\'re less polished than blog posts but contain valuable lessons learned, code snippets, and performance metrics. Perfect for rapid knowledge sharing and documenting "aha!" moments.'
                  : '實驗筆記是快速的技術筆記、實驗和洞察。它們不像部落格文章那麼完善，但包含有價值的經驗教訓、代碼片段和性能指標。非常適合快速分享知識和記錄「啊哈！」時刻。'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
