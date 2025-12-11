'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/section-header';
import { TrendingUp, Database, Code, Zap, Instagram, Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

const timeline = [
  {
    year: '2023-Present',
    title: 'NetaKong Lab',
    role: 'Co-founder & Full-Stack Builder',
    icon: Code,
    highlights: [
      'Building products at the intersection of markets, data, and content',
      'Polymarket analysis tools and prediction market research',
      'Automated trading strategies with Freqtrade',
      'Web development with Next.js and modern frameworks'
    ]
  },
  {
    year: '2022-2023',
    title: 'Crypto Treasury Associate',
    role: 'Risk & Portfolio Management',
    icon: Briefcase,
    highlights: [
      'Managed treasury operations and crypto portfolio',
      'Risk assessment and hedging strategies',
      'DeFi protocol evaluation and yield optimization',
      'Built internal analytics dashboards'
    ]
  },
  {
    year: '2020-Present',
    title: 'Data Science & Analytics',
    role: 'Independent Researcher',
    icon: Database,
    highlights: [
      'Kaggle competitions and machine learning projects',
      'Time series forecasting and predictive modeling',
      'Web scraping and data pipeline automation',
      'Analytics dashboard development with Streamlit'
    ]
  },
  {
    year: '2024-Present',
    title: 'netakong_nttainment',
    role: 'Content Creator',
    icon: Instagram,
    highlights: [
      'Instagram content brand mixing finance, tech, and culture',
      'Behind-the-scenes of market experiments',
      'Creative storytelling through data',
      'Building a community around ideas that ship'
    ]
  }
];

const philosophies = [
  {
    icon: TrendingUp,
    title: 'Experiment → Measure → Ship',
    description: 'Every project starts as a hypothesis. Data validates. Iteration refines. Then we ship.'
  },
  {
    icon: Database,
    title: 'Data Drives Decisions',
    description: 'From trading strategies to product features—quantitative analysis informs every move.'
  },
  {
    icon: Zap,
    title: 'Automate Everything',
    description: 'If it can be automated, it should be. More time for experiments that matter.'
  },
  {
    icon: Code,
    title: 'Build in Public',
    description: 'Share the process, not just the results. The journey is part of the product.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            subtitle="About"
            title="The Story Behind NetaKong Lab"
            description="From Weather to NetaKong—a journey through markets, data, and building things that ship."
            className="mb-12"
          />
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Hi, I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Bryan</span>, 
              also known as <span className="font-semibold">Weather</span> in some circles. 
              NetaKong Lab is where I turn curiosity about markets, data, and automation into 
              experiments that actually ship.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              My background spans <span className="font-semibold">data science</span>, 
              <span className="font-semibold"> crypto treasury management</span>, and 
              <span className="font-semibold"> full-stack web development</span>. I've worked 
              with prediction markets like Polymarket, built algorithmic trading strategies, 
              competed in Kaggle challenges, and crafted web products with modern frameworks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The "lab" mindset is core: treat everything as an experiment, measure obsessively, 
              iterate quickly, and ship. Whether it's analyzing market probabilities, 
              automating content workflows with n8n and AI agents, or designing user experiences—
              the goal is always the same: <span className="font-semibold text-blue-600 dark:text-blue-400">
              build something that works, then make it better.</span>
            </p>
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Core Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Experience & Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-8 pb-8 border-l-2 border-blue-200 dark:border-blue-800 last:border-l-0 last:pb-0"
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {item.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {item.role}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {item.year}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
