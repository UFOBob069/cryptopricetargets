import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route';

interface PredictionData {
  coinId: string;
  targetPrice: number;
  targetDate: string;
  // add other properties
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: PredictionData = await request.json();
    const { coinId, targetPrice, targetDate } = data;

    const prediction = await prisma.prediction.create({
      data: {
        coinId,
        targetPrice,
        targetDate,
        userId: session.user.id,
      },
    });

    return NextResponse.json(prediction);
  } catch {
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
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { coinId, targetPrice, timeframe, analysis } = await req.json();

    const prediction = await prisma.prediction.update({
      where: {
        userId: session.user.id,
        coinId: coinId,
        timeframe: timeframe,
      },
      data: {
        targetPrice: targetPrice,
        analysis: analysis,
      },
    });

    return NextResponse.json(prediction);
  } catch {
    return new Response('Error updating prediction', { status: 500 });
  }
} 