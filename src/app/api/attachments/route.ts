import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileUrl, description, topicId } = await req.json();

    if (!topicId) {
        throw new Error('topicId is required');
      }
  
      const newAttachment = await prisma.attachment.create({
        data: {
          fileName,
          fileUrl,
          description,
          topic: {
            connect: { id: topicId }
          }
        }
      });
  
      return NextResponse.json({ message: 'Attachment created successfully', attachment: newAttachment });
    } catch (error) {
      console.error('Error creating attachment:', error);
      return NextResponse.error();
    }
  }