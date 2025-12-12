'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

type ViewCounterProps = {
  slug: string;
  type: 'blog' | 'lab-note';
};

export default function ViewCounter({ slug, type }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increment view count
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/views/${type}/${slug}`, {
          method: 'POST',
        });
        
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('Failed to increment view count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementView();
  }, [slug, type]);

  if (isLoading || views === null) {
    return (
      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
        <Eye className="w-4 h-4" />
        <span className="text-sm">---</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
      <Eye className="w-4 h-4" />
      <span className="text-sm">{views.toLocaleString()} views</span>
    </div>
  );
}
