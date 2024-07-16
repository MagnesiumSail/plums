import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, description, file, topicId } = await req.json();

    if (!name || !file || !topicId) {
      return NextResponse.json({ message: 'Name, image, and topicId are required' }, { status: 400 });
    }

    const newImage = await prisma.image.create({
      data: {
        name,
        description,
        url: file,
        topic: { connect: { id: topicId } },
      },
    });

    return NextResponse.json(newImage, { status: 201 });
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
