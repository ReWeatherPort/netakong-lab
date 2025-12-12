import { ImageResponse } from '@vercel/og';
import { blogPosts } from '@/data/blog-posts';

export const runtime = 'edge';

export const alt = 'NetaKong Lab Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: 60, color: 'white' }}>NetaKong Lab</h1>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 80,
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', gap: 12 }}>
          {post.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(59, 130, 246, 0.2)',
                border: '2px solid rgba(59, 130, 246, 0.5)',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: 20,
                color: '#60a5fa',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: '#94a3b8',
              margin: 0,
              maxWidth: 900,
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                background: 'linear-gradient(135deg, #00f5ff 0%, #0080ff 50%, #8000ff 100%)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
                NetaKong Lab
              </span>
              <span style={{ fontSize: 22, color: '#64748b' }}>
                {post.author}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 22, color: '#64748b' }}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
