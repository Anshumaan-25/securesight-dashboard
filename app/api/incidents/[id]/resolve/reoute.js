import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    const currentIncident = await prisma.incident.findUnique({
      where: { id }
    });

    if (!currentIncident) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: {
        resolved: !currentIncident.resolved,
        updatedAt: new Date()
      },
      include: {
        camera: {
          select: {
            name: true,
            location: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedIncident
    });
  } catch (error) {
    console.error('Error updating incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update incident' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
