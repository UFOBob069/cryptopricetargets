import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { coinId, targetPrice, timeframe, analysis } = await req.json();

    const prediction = await prisma.prediction.create({
      data: {
        coinId,
        targetPrice,
        timeframe,
        analysis,
        userId: session.user.id,
      },
    });

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prediction' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get('coinId');
    const timeframe = searchParams.get('timeframe');

    const predictions = await prisma.prediction.findMany({
      where: {
        coinId: coinId || undefined,
        timeframe: timeframe || undefined,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        votes: true,
        comments: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
} 