import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
    try {
      const { name, description, topicId, image } = await req.json();
  
      if (!name || !image) {
        throw new Error('Name and image are required');
      }
  
      const newImage = await prisma.image.create({
        data: {
          name,
          description,
          url: image,
          topic: {
            connect: { id: topicId },
          },
        },
      });
  
      return NextResponse.json({ message: 'New image created successfully', newImage });
    } catch (error) {
      console.error('Error creating image:', error);
      return NextResponse.json({ message: 'Error creating image', error: error.message }, { status: 500 });
    }
  }

export async function GET(req: NextRequest) {
    try {
      const images = await prisma.image.findMany();
      return NextResponse.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      return NextResponse.error();
    }
  }
