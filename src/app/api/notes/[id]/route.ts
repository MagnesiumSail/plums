import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function PATCH(req: NextRequest, { params }) {
  try {
    const { id } = params;
    const { title, content } = await req.json();

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ message: 'Error updating note', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const { id } = params;

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ message: 'Error deleting note', error: error.message }, { status: 500 });
  }
}
