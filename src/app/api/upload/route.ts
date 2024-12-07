import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    const title: string | null = data.get('title') as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'No file or title provided' },
        { status: 400 }
      );
    }

    // Au lieu d'écrire directement le fichier, on pourrait envoyer un email ou sauvegarder dans une DB
    return NextResponse.json({
      success: true,
      message: 'Meme submitted for review',
      data: {
        filename: file.name,
        title: title
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}