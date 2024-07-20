import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, topicIds } = await req.json();

    const newTag = await prisma.tag.create({
      data: {
        name,
        topics: {
          create: topicIds.map((topicId: string) => ({
            topic: { connect: { id: topicId } },
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Tag created successfully', tag: newTag });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ message: 'Error creating tag', error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        topics: {
          include: {
            topic: true,
          },
        },
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ message: 'Error fetching tags', error: (error as Error).message }, { status: 500 });
  }
}
