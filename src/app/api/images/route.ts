import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, description, image, topicId } = await req.json();

    if (!name || !description || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newImage = await prisma.image.create({
      data: {
        name,
        url: image, 
        description,
        topicId,
      },
    });

    return NextResponse.json({ message: 'Image created successfully', image: newImage });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
