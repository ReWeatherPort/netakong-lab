import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  className,
  children 
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {subtitle && (
        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {subtitle}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
