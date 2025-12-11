'use client';

import { useState, useMemo } from 'react';

export const dynamic = 'force-dynamic';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import Tag from '@/components/ui/tag';
import SectionHeader from '@/components/ui/section-header';
import { projects, getAllTags, filterProjects } from '@/data/projects';
import { ProjectStatus } from '@/lib/types';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'featured'>('featured');

  const allTags = getAllTags();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = filterProjects(searchQuery, selectedTags, statusFilter);

    // Apply sorting
    switch (sortBy) {
      case 'featured':
        result = result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      case 'name':
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        result = result.reverse();
        break;
    }

    return result;
  }, [searchQuery, selectedTags, statusFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            subtitle="Portfolio"
            title="All Projects"
            description="A comprehensive collection of experiments, tools, and products across markets, data science, and web development."
            className="mb-12"
          />
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Status Filter & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Status:
              </span>
              <Tag
                variant={statusFilter === undefined ? 'default' : 'outline'}
                interactive
                onClick={() => setStatusFilter(undefined)}
              >
                All
              </Tag>
              <Tag
                variant={statusFilter === 'Live' ? 'success' : 'outline'}
                interactive
                onClick={() => setStatusFilter('Live')}
              >
                Live
              </Tag>
              <Tag
                variant={statusFilter === 'WIP' ? 'warning' : 'outline'}
                interactive
                onClick={() => setStatusFilter('WIP')}
              >
                WIP
              </Tag>
              <Tag
                variant={statusFilter === 'Idea' ? 'secondary' : 'outline'}
                interactive
                onClick={() => setStatusFilter('Idea')}
              >
                Idea
              </Tag>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by tags:
              </span>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear all ({selectedTags.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Tag
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  interactive
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Tag>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedProjects.length} of {projects.length} projects
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No projects found matching your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
                setStatusFilter(undefined);
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
