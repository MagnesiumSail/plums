import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { title, content, topicId } = await req.json();

    if (!title || !content) {
      throw new Error('Title and content are required');
    }

    const newNoteData: any = {
      title,
      content,
    };

    if (topicId) {
      newNoteData.topic = {
        connect: { id: topicId },
      };
    }

    const newNote = await prisma.note.create({
      data: newNoteData,
    });

    return NextResponse.json({ message: 'New note created successfully', newNote });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ message: 'Error creating note', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.error();
  }
}
