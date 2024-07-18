import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { promises as fs } from 'fs'; 
import path from 'path';
import nextConnect from 'next-connect';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

type AttachmentData = {
  fileName: string;
  fileUrl: string; 
  description?: string;
  topicId: string;
};

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  },
});

handler.use(upload.single('file'));

handler.post(async (req, res) => {
  const { description, topicId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filename = file.filename;
  const filePath = path.join('uploads', filename); 

  try {
    await fs.writeFile(filePath, file.buffer);

    const newAttachment: AttachmentData = {
      fileName: file.originalname,
      fileUrl: `/${filePath}`, 
      description,
      topicId,
    };

    const createdAttachment = await prisma.attachment.create({
      data: newAttachment,
    });

    res.status(201).json(createdAttachment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attachment', error: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const attachments = await prisma.attachment.findMany();
    res.json(attachments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attachments', error: error.message });
  }
});

export default handler;
