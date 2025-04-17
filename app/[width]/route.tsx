import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { width: string } }) {
  const { width } = params;
  redirect(`/${width}/${width}/png`);
}
