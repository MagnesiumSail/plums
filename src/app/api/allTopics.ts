import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        notes: true,
        images: true,
        links: true,
      },
    });
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Error fetching topics', error: error.message });
  }
}
