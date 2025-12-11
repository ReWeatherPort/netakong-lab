'use client';

import { useState } from 'react';

export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import { ContactFormData } from '@/lib/types';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/username',
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/username',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/netakong_nttainment',
    color: 'hover:text-pink-600'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:contact@netakong.lab',
    color: 'hover:text-blue-600'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            subtitle="Get in Touch"
            title="Let's Work Together"
            description="Have a project in mind? Want to collaborate on markets, data, or web development? Drop me a message."
            className="mb-12 text-center items-center"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                    } rounded-lg focus:outline-none focus:ring-2 text-gray-900 dark:text-gray-100`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                    } rounded-lg focus:outline-none focus:ring-2 text-gray-900 dark:text-gray-100`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                    } rounded-lg focus:outline-none focus:ring-2 text-gray-900 dark:text-gray-100 resize-none`}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <span>✓</span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Let's Build Something
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your vision. Whether it's:
              </p>
              <ul className="space-y-3">
                {[
                  'Polymarket analysis or prediction market projects',
                  'Trading strategy development and backtesting',
                  'Data science consulting and analytics',
                  'Web development and product design',
                  'Automation workflows and AI agents'
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Connect on Social
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group`}
                    >
                      <Icon className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${link.color} transition-colors`} />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Response time:
                </span>{' '}
                I typically respond within 24-48 hours. For urgent inquiries, 
                reach out via email directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
