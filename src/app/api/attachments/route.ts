// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { prisma } from '../../../../lib/db';

// const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(process.cwd(), 'public/uploads');
//   form.keepExtensions = true;
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { fields, files } = await parseForm(req);
//     const file = files.file as formidable.File;

//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filename = `${Date.now()}-${file.name}`;
//     const oldPath = file.path;
//     const newPath = path.join(process.cwd(), 'public/uploads', filename);

//     await fs.promises.rename(oldPath, newPath);

//     const newAttachment = await prisma.attachment.create({
//       data: {
//         fileName: file.name,
//         fileUrl: `/uploads/${filename}`,
//         description: fields.description as string,
//         topicId: fields.topicId as string,
//       },
//     });

//     res.status(201).json(newAttachment);
//   } catch (error) {
//     console.error('Error creating attachment:', error);
//     res.status(500).json({ message: 'Error creating attachment', error: (error as Error).message });
//   }
// }

// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs';
