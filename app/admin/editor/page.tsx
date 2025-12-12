'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Save, 
  Eye, 
  Upload, 
  Image as ImageIcon, 
  Code, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon,
  Heading,
  Quote,
  ArrowLeft,
  Send
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminEditor() {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryZh, setSummaryZh] = useState('');
  const [content, setContent] = useState('');
  const [contentZh, setContentZh] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [type, setType] = useState<'experiment' | 'insight' | 'tutorial' | 'analysis'>('experiment');
  const [readTime, setReadTime] = useState('5 min read');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setUploadedImages(prev => [...prev, imageUrl]);
      
      // Insert markdown image syntax at cursor
      const imageMarkdown = `\n![Image description](${imageUrl})\n`;
      setContent(prev => prev + imageMarkdown);
    };
    reader.readAsDataURL(file);
  };

  // Insert markdown syntax
  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    setContent(prev => prev + syntax.replace('{}', placeholder));
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  // Save draft
  const saveDraft = () => {
    setSaving(true);
    const draft = {
      title,
      titleZh,
      summary,
      summaryZh,
      content,
      contentZh,
      tags,
      type,
      readTime,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('labNoteDraft', JSON.stringify(draft));
    setTimeout(() => {
      setSaving(false);
      alert('Draft saved!');
    }, 500);
  };

  // Publish note
  const publishNote = async () => {
    if (!title || !content) {
      alert('Please fill in at least title and content!');
      return;
    }

    setSaving(true);
    
    // In a real app, you'd POST to an API endpoint
    // For now, we'll just log and show a success message
    const newNote = {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      titleZh: titleZh || title,
      date: new Date().toISOString().split('T')[0],
      summary,
      summaryZh: summaryZh || summary,
      content,
      contentZh: contentZh || content,
      tags,
      type,
      readTime,
      published: true,
    };

    console.log('Publishing note:', newNote);
    
    setTimeout(() => {
      setSaving(false);
      alert('Note published! (In production, this would save to your database)');
      // Optionally redirect to the new note
      // router.push(`/lab-notes/${newNote.slug}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
          <Link
            href="/lab-notes"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lab Notes
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            
            <button
              onClick={saveDraft}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            
            <button
              onClick={publishNote}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title (English)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your awesome lab note title..."
                className="w-full px-4 py-3 text-2xl font-bold bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                標題 (中文)
              </label>
              <input
                type="text"
                value={titleZh}
                onChange={(e) => setTitleZh(e.target.value)}
                placeholder="你的實驗筆記標題..."
                className="w-full px-4 py-3 text-xl font-bold bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Summary (English)
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A brief summary of what this note is about..."
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                摘要 (中文)
              </label>
              <textarea
                value={summaryZh}
                onChange={(e) => setSummaryZh(e.target.value)}
                placeholder="這篇筆記的簡短摘要..."
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => insertMarkdown('## ', 'Heading')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Heading"
              >
                <Heading className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('**{}**', 'bold text')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Bold"
              >
                <Bold className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('*{}*', 'italic text')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Italic"
              >
                <Italic className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('\n- ', 'List item')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="List"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('[{}](url)', 'link text')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('\n```python\n{}\n```\n', 'code here')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Code Block"
              >
                <Code className="w-5 h-5" />
              </button>
              <button
                onClick={() => insertMarkdown('\n> ', 'Quote')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Quote"
              >
                <Quote className="w-5 h-5" />
              </button>
              
              <div className="ml-auto">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content (Markdown)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your lab note in Markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

\`\`\`python
def hello():
    print('Hello, World!')
\`\`\`

> Quote

[Link text](https://example.com)"
                rows={20}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                內容 (Markdown - 中文)
              </label>
              <textarea
                value={contentZh}
                onChange={(e) => setContentZh(e.target.value)}
                placeholder="用 Markdown 編寫你的實驗筆記..."
                rows={20}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono text-sm"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Type Selection */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Note Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['experiment', 'insight', 'tutorial', 'analysis'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                      type === t
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-900 dark:hover:text-purple-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Read Time */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Uploaded Images
                </label>
                <div className="space-y-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`![Image](${img})`);
                            alert('Markdown copied to clipboard!');
                          }}
                          className="px-3 py-1 text-xs bg-white text-gray-900 rounded"
                        >
                          Copy Markdown
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
