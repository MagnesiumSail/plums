import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function PATCH(req: NextRequest, { params }) {
    try {
      const { id } = params;
      const { name, description, file } = await req.json();
  
      let updatedData: any = { name, description };
      if (file) {
        updatedData.url = file; 
      }
  
      const updatedImage = await prisma.image.update({
        where: { id },
        data: updatedData,
      });
  
      return NextResponse.json(updatedImage);
    } catch (error) {
      console.error('Error updating image:', error);
      return NextResponse.json({ message: 'Error updating image', error: error.message }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest, { params }) {
    try {
      const { id } = params;
  
      const existingImage = await prisma.image.findUnique({
        where: { id },
      });
  
      if (!existingImage) {
        return NextResponse.json({ message: 'Image not found' }, { status: 404 });
      }
  
      await prisma.image.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      return NextResponse.json({ message: 'Error deleting image', error: error.message }, { status: 500 });
    }
  }


