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
        attachments: true,
      },
    });

    if (!topic) {
      return NextResponse.error({ status: 404, body: 'Topic not found' });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.error();
  }
}
