import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function PATCH(req: NextRequest, { params }) {
  try {
    const { id } = params;
    const { fileName, description, fileUrl } = await req.json();

    const updatedAttachment = await prisma.attachment.update({
      where: { id },
      data: { fileName, description, fileUrl },
    });

    return NextResponse.json(updatedAttachment);
  } catch (error) {
    console.error('Error updating attachment:', error);
    return NextResponse.json({ message: 'Error updating attachment', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const { id } = params;

    await prisma.attachment.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    return NextResponse.json({ message: 'Error deleting attachment', error: error.message }, { status: 500 });
  }
}
