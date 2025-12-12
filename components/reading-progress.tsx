'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate progress percentage
      const totalScrollableHeight = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalScrollableHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-150 ease-out shadow-lg shadow-cyan-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
