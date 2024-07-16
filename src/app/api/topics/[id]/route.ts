import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params;

 
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        notes: true,
        images: true,
        links: true,
        parent: true,
      },
    });

    if (!topic) {
      console.error('Topic not found:', id);
      return NextResponse.error({ status: 404, body: 'Topic not found' });
    }

  
    const subTopics = await prisma.topic.findMany({
      where: { parentId: id }
    });

   
    const topicWithChildren = {
      ...topic,
      children: subTopics,
    };

    console.log('Fetched topic with children:', topicWithChildren);

    return NextResponse.json(topicWithChildren);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.error();
  }
}
