'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Code, Database, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import { getFeaturedProjects } from '@/data/projects';
import SectionHeader from '@/components/ui/section-header';

const focusAreas = [
  {
    icon: TrendingUp,
    title: 'Polymarket / Crypto Analysis',
    description: 'Prediction markets, trading strategies, treasury management'
  },
  {
    icon: Zap,
    title: 'Freqtrade / Trading',
    description: 'Algorithmic trading strategies and automated execution'
  },
  {
    icon: Database,
    title: 'Data Science & Kaggle',
    description: 'ML models, analytics dashboards, competitive data science'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Next.js, React, Hugo - building products that ship'
  },
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Welcome to the Lab</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                NetaKong Lab
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Turning markets, data, and content into{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                experiments that actually ship
              </span>
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300"
              >
                Work with Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Focus Areas Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              subtitle="Featured Work"
              title="Recent Projects"
              description="A selection of experiments, tools, and products I've built across markets, data, and web."
              className="text-center items-center mb-12"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Follow the Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Behind-the-scenes content, market insights, and creative experiments on Instagram
            </p>
            <a
              href="https://instagram.com/netakong_nttainment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>@netakong_nttainment</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
