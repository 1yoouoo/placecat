import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ width: string }> }) {
  const { width } = await params;
  redirect(`/${width}/${width}/png`);
}
