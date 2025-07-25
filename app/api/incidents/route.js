import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');
    
    const where = {};
    if (resolved !== null) {
      where.resolved = resolved === 'true';
    }

    const incidents = await prisma.incident.findMany({
      where,
      include: {
        camera: {
          select: {
            name: true,
            location: true
          }
        }
      },
      orderBy: {
        tsStart: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: incidents
    });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}