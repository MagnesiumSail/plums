import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ message: 'Topic ID is required' }, { status: 400 });
    }

    console.log('Fetching topic with children:', id);
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        notes: true,
        images: true,
        links: true,
        parent: true,
        children: true,
      },
    });

    if (!topic) {
      console.error('Topic not found:', id);
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }

    console.log('Fetched topic with children:', topic);

    return NextResponse.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json({ message: 'Error fetching topic', error: error.message }, { status: 500 });
  }
}
