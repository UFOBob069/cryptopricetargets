import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route';

interface PredictionData {
  coinId: string;
  targetPrice: number;
  targetDate: string;
  timeframe?: string;
  analysis?: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: PredictionData = await request.json();
    const { coinId, targetPrice, targetDate, timeframe, analysis } = data;

    const prediction = await prisma.prediction.create({
      data: {
        coin: coinId,
        targetPrice,
        targetDate,
        timeframe, // Include this if your schema has a 'timeframe' field
        analysis,  // Include this if your schema has an 'analysis' field
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
        coin: coinId || undefined,
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
        _count: {
          select: {
            comments: true,
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

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { coinId, targetPrice, timeframe, analysis } = await req.json();

    // Adjust this `where` clause to match how your primary key or unique identifiers are set up in Prisma
    const prediction = await prisma.prediction.update({
      where: {
        id: `${session.user.id}-${coinId}-${timeframe}`,
      },
      data: {
        targetPrice,
        analysis,
      },
    });

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating prediction' },
      { status: 500 }
    );
  }
}
