import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ width: string; height: string }> }) {
  const { width, height } = await params;

  // 기본 포맷으로 PNG를 사용하여 리디렉션
  redirect(`/${width}/${height}/png`);
}
