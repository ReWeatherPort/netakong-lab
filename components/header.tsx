'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import LanguageToggle from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/search-bar';

const navigationKeys = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.projects', href: '/projects' },
  { key: 'nav.skills', href: '/skills' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.labNotes', href: '/lab-notes' },
  { key: 'nav.contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center gap-2.5 transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image 
                  src="/logo_nt.svg" 
                  alt="NetaKong Lab Icon" 
                  width={36} 
                  height={36}
                  className="rounded-lg"
                  priority
                />
              </div>
              <span className="text-xl font-tech text-tech-gradient tracking-tight relative">
                NetaKong Lab
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 group-hover:w-full transition-all duration-300 ease-out shadow-lg shadow-cyan-500/50"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigationKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <SearchBar />
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="space-y-1 pb-3 pt-2">
                {navigationKeys.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
