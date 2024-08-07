import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(req: NextRequest) {
    try {
        const { title, description, parentId } = await req.json();

        const newTopic = await prisma.topic.create({
            data: {
                title,
                description,
                parentId: parentId || null,  
            },
        });

        return NextResponse.json({ message: 'Topic created successfully', topic: newTopic });
    } catch (error) {
        console.error('Error creating topic:', error);
        return NextResponse.json({ message: 'Error creating topic', error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                notes: true,
                images: true,
                links: true,
                parent: true, 
                children: true,
            },
        });

        return NextResponse.json(topics);
    } catch (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json({ message: 'Error fetching topics', error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { type, data, topicId } = await req.json();

        let updateData = {};

        if (type === 'note') {
            updateData = {
                notes: {
                    create: data,
                },
            };
        } else if (type === 'image') {
            updateData = {
                images: {
                    create: data,
                },
            };
        } else if (type === 'link') {
            updateData = {
                linkss: {
                    create: data,
                },
            };
        }

        const updatedTopic = await prisma.topic.update({
            where: { id: topicId },
            data: updateData,
            include: {
                notes: true,
                images: true,
                links: true,
            },
        });

        return NextResponse.json({ message: 'Topic updated successfully', topic: updatedTopic });
    } catch (error) {
        console.error('Error updating topic:', error);
        return NextResponse.json({ message: 'Error updating topic', error: error.message }, { status: 500 });
    }
}
