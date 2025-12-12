'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme-provider';

type GiscusCommentsProps = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  reactionsEnabled?: '1' | '0';
  emitMetadata?: '1' | '0';
  inputPosition?: 'top' | 'bottom';
  lang?: string;
  loading?: 'lazy' | 'eager';
};

export default function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  lang = 'en',
  loading = 'lazy',
}: GiscusCommentsProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing script
    containerRef.current.innerHTML = '';

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    containerRef.current.appendChild(script);
  }, [repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, inputPosition, theme, lang, loading]);

  return <div ref={containerRef} className="giscus" />;
}
