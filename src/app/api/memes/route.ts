import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Meme from '@/models/Meme';

export async function GET() {
  try {
    await connectDB();
    const memes = await Meme.find({ status: 'approved' });
    return NextResponse.json(memes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.formData();
    const file = data.get('file') as File;
    const title = data.get('title') as string;

    // Pour l'instant, on sauvegarde juste les infos
    const meme = await Meme.create({
      title,
      url: `/memes/${file.name}`,
      type: file.type.includes('video') ? 'video' : 'image',
      status: 'pending'
    });

    return NextResponse.json(meme);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit meme' },
      { status: 500 }
    );
  }
}