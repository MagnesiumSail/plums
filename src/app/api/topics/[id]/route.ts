import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    console.log('Fetching topic with children:', id);
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        notes: true,
        images: true,
        links: true,
        attachments: true,
        children: true,
        parent: true,
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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { title, description, parentId } = await req.json();

    console.log('Received PATCH request for topic:', id);
    console.log('Request body:', { title, description, parentId });

    const updatedTopic = await prisma.topic.update({
      where: { id },
      data: { title, description, parentId },
    });

    console.log('Updated topic:', updatedTopic);
    return NextResponse.json(updatedTopic);
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json({ message: 'Error updating topic', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.note.deleteMany({ where: { topicId: id } });
    await prisma.image.deleteMany({ where: { topicId: id } });
    await prisma.link.deleteMany({ where: { topicId: id } });
    await prisma.attachment.deleteMany({ where: { topicId: id } });
    await prisma.topic.deleteMany({ where: { parentId: id } });

    const deletedTopic = await prisma.topic.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json({ message: 'Error deleting topic', error: error.message }, { status: 500 });
  }
}

