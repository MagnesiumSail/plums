import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { topicTitle, topicDescription } = await req.json();

    const newTopic = await prisma.topic.create({
      data: {
        title: topicTitle,
        description: topicDescription,
      },
    });

    return NextResponse.json({ message: 'Topic created successfully', topic: newTopic });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.error();
  }
}
