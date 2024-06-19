import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileUrl, description, topicId } = await req.json();

    const data: any = {
      fileName,
      fileUrl,
      description,
    };

    if (topicId) {
      data.topic = { connect: { id: topicId } };
    }

    const newAttachment = await prisma.attachment.create({
      data,
    });

    return NextResponse.json({ message: 'Attachment created successfully', attachment: newAttachment });
  } catch (error) {
    console.error('Error creating attachment:', error);
    return NextResponse.json({ error: 'Error creating attachment' }, { status: 500 });
  }
}
