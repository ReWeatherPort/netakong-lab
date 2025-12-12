import { ImageResponse } from '@vercel/og';
import { labNotes } from '@/data/lab-notes';

export const runtime = 'edge';

export const alt = 'NetaKong Lab Note';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = labNotes.find(n => n.slug === slug);

  if (!note) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
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

  // Type badge colors
  const typeColors = {
    experiment: { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 0.5)', text: '#c084fc' },
    insight: { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgba(34, 197, 94, 0.5)', text: '#4ade80' },
    tutorial: { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.5)', text: '#60a5fa' },
    analysis: { bg: 'rgba(251, 146, 60, 0.2)', border: 'rgba(251, 146, 60, 0.5)', text: '#fb923c' },
  };

  const typeColor = typeColors[note.type];

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 80,
        }}
      >
        {/* Type Badge & Tags */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              background: typeColor.bg,
              border: `2px solid ${typeColor.border}`,
              borderRadius: 8,
              padding: '12px 20px',
              fontSize: 24,
              color: typeColor.text,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            🔬 {note.type}
          </div>
          {note.tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '2px solid rgba(139, 92, 246, 0.5)',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: 20,
                color: '#a78bfa',
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
            {note.title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: '#c4b5fd',
              margin: 0,
              maxWidth: 900,
            }}
          >
            {note.summary}
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
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #8b5cf6 100%)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
                Lab Notes
              </span>
              <span style={{ fontSize: 22, color: '#a78bfa' }}>
                NetaKong Lab
              </span>
            </div>
          </div>
          <div style={{ fontSize: 22, color: '#a78bfa' }}>
            {new Date(note.date).toLocaleDateString('en-US', {
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
