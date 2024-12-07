import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sauvegarde dans le dossier public/pending
    const pendingDir = path.join(process.cwd(), 'public', 'pending');
    const filePath = path.join(pendingDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}