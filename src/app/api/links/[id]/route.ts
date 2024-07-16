import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function PATCH(req: NextRequest, { params }) {
  try {
    const { id } = params;
    const { fileUrl, description } = await req.json();

    const updatedLink = await prisma.link.update({
      where: { id },
      data: { fileUrl, description },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ message: 'Error updating link', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const { id } = params;

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ message: 'Error deleting link', error: error.message }, { status: 500 });
  }
}
