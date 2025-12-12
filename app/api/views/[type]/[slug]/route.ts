import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for views (replace with database in production)
const viewStore = new Map<string, number>();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params;
  const key = `${type}:${slug}`;
  
  // Get current view count
  const currentViews = viewStore.get(key) || 0;
  
  // Increment view count
  const newViews = currentViews + 1;
  viewStore.set(key, newViews);
  
  return NextResponse.json({ views: newViews });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params;
  const key = `${type}:${slug}`;
  
  const views = viewStore.get(key) || 0;
  
  return NextResponse.json({ views });
}
