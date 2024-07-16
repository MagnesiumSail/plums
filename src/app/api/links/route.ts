import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { fileUrl, description, topicId } = await req.json();

    const data: any = {
      fileUrl,
      description
    };

    if (topicId) {
      data.topic = { connect: { id: topicId } };
    }

    const newLink = await prisma.link.create({
      data,
    });

    return NextResponse.json({ message: 'Link created successfully', link: newLink });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Error creating link' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const links = await prisma.link.findMany();
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.error();
  }
}
