import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = await upload.single('file');

  return new Promise((resolve, reject) => {
    form(req as any, {} as any, async (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return resolve(NextResponse.json({ message: 'Error uploading file', error: err.message }, { status: 500 }));
      }

      const { description, topicId } = (req as any).body;
      const file = (req as any).file;

      if (!file) {
        console.error('No file uploaded');
        return resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
      }

      console.log('Received file:', file);
      console.log('Received description:', description);
      console.log('Received topicId:', topicId);

      const filename = `${Date.now()}-${file.originalname}`;
      const buffer = Buffer.from(file.buffer);
      const uploadPath = path.join(process.cwd(), 'public/uploads', filename);

      try {
        await fs.promises.writeFile(uploadPath, buffer);
        const newAttachment = await prisma.attachment.create({
          data: {
            fileName: file.originalname,
            fileUrl: `/uploads/${filename}`,
            description,
            topicId,
          },
        });

        return resolve(NextResponse.json(newAttachment, { status: 201 }));
      } catch (error) {
        console.error('Error creating attachment:', error);
        return resolve(NextResponse.json({ message: 'Error creating attachment', error: error.message }, { status: 500 }));
      }
    });
  });
}

export async function GET(req: NextRequest) {
  try {
    const attachments = await prisma.attachment.findMany();
    return NextResponse.json(attachments);
  } catch (error) {
    console.error('Error fetching attachments:', error);
    return NextResponse.json({ message: 'Error fetching attachments', error: error.message }, { status: 500 });
  }
}
