import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog-posts';
import { labNotes } from '@/data/lab-notes';

export async function GET() {
  const siteUrl = 'https://netakong.com'; // Replace with your actual domain
  
  // Combine blog posts and lab notes
  const allContent = [
    ...blogPosts.map(post => ({
      title: post.title,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      pubDate: new Date(post.date).toUTCString(),
      category: post.category,
      author: post.author,
    })),
    ...labNotes.map(note => ({
      title: note.title,
      link: `${siteUrl}/lab-notes/${note.slug}`,
      description: note.summary,
      pubDate: new Date(note.date).toUTCString(),
      category: note.type,
      author: 'Bryan / Weather',
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NetaKong Lab</title>
    <link>${siteUrl}</link>
    <description>AI, Crypto, Data Science insights from Bryan / Weather</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${allContent.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <author>${item.author}</author>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
