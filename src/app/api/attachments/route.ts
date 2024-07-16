import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { prisma } from '../../../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fileName = formData.get('fileName') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;
    const topicId = formData.get('topicId') as string;

    if (!topicId) {
      return NextResponse.json({ message: 'Topic ID parameter is missing' }, { status: 400 });
    }

 
    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }

    let fileUrl = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s/g, '_');
      await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
      fileUrl = `/uploads/${filename}`;
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        fileName,
        fileUrl,
        description,
        topic: { connect: { id: topicId } },
      },
    });

    return NextResponse.json({ message: 'Attachment created successfully', attachment: newAttachment }, { status: 201 });
  } catch (error) {
    console.error('Error creating attachment:', error);
    return NextResponse.json({ message: 'Error creating attachment', error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const attachments = await prisma.attachment.findMany();
    return NextResponse.json(attachments);
  } catch (error) {
    console.error('Error fetching attachments:', error);
    return NextResponse.error();
  }
}
