'use client';

import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';
import SectionHeader from '@/components/ui/section-header';
import { skillCategories } from '@/data/skills';

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            subtitle="Capabilities"
            title="Skills & Expertise"
            description="A multidisciplinary toolkit spanning markets, data, automation, and product development."
            className="mb-12"
          />
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {category.icon && (
                    <span className="text-4xl">{category.icon}</span>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {category.title}
                  </h2>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {skill.name}
                        </h3>
                        {skill.proficiency && (
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            skill.proficiency === 'Expert'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : skill.proficiency === 'Advanced'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {skill.proficiency}
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            The Lab Mindset
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Every project is an experiment. The goal isn't just to build—it's to{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              measure, iterate, and ship.
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            From analyzing prediction markets with AI, to building automated trading strategies,
            to crafting web experiences—each domain feeds into the others. Data informs design.
            Markets inform models. Code brings it all together.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
