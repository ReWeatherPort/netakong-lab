'use client';

import { Project } from '@/lib/types';
import Tag from '@/components/ui/tag';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const statusColors = {
  Live: 'success' as const,
  WIP: 'warning' as const,
  Idea: 'secondary' as const,
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {project.timeline && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {project.timeline}
              </p>
            )}
          </div>
          <Tag variant={statusColors[project.status]}>
            {project.status}
          </Tag>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech} variant="outline" className="text-xs">
              {tech}
            </Tag>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag} variant="default" className="text-xs">
              #{tag}
            </Tag>
          ))}
          {project.tags.length > 4 && (
            <Tag variant="secondary" className="text-xs">
              +{project.tags.length - 4}
            </Tag>
          )}
        </div>

        {/* Links */}
        {(project.links?.github || project.links?.live || project.links?.demo) && (
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {(project.links.live || project.links.demo) && (
              <a
                href={project.links.live || project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Featured
        </div>
      )}
    </motion.div>
  );
}
