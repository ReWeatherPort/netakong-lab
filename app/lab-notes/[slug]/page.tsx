'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Beaker, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getLabNoteBySlug, type LabNote } from '@/data/lab-notes';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

export default function LabNotePage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [note, setNote] = useState<LabNote | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const foundNote = getLabNoteBySlug(slug);
    setNote(foundNote);
    setLoading(false);

    if (!foundNote) {
      router.push('/lab-notes');
    }
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  const content = language === 'en' ? note.content : note.contentZh;
  const title = language === 'en' ? note.title : note.titleZh;
  const TypeIcon = typeIcons[note.type];
  const typeLabel = typeLabels[language][note.type];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/lab-notes"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back to Lab Notes' : '返回實驗筆記'}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Type Badge */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 rounded-full">
              <TypeIcon className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">{typeLabel}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{note.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <time dateTime={note.date}>
                {new Date(note.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Share Button */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(language === 'en' ? 'Link copied!' : '連結已複製！');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {language === 'en' ? 'Share' : '分享'}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-gray-100
            prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-ul:text-gray-700 dark:prose-ul:text-gray-300
            prose-ol:text-gray-700 dark:prose-ol:text-gray-300
            prose-li:marker:text-purple-600 dark:prose-li:marker:text-purple-400
            prose-blockquote:border-purple-600 dark:prose-blockquote:border-purple-400
            prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
            prose-table:text-gray-700 dark:prose-table:text-gray-300
            prose-th:bg-gray-100 dark:prose-th:bg-gray-800
            prose-td:border-gray-200 dark:prose-td:border-gray-700"
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg !mt-0"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>
      </article>
    </div>
  );
}
