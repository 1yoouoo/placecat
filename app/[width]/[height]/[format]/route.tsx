import { NextRequest } from 'next/server';
import { badRequestResponse, serverErrorResponse } from '@/app/lib/error-handler';
import { validateNumber, validateFormat, MAX_WIDTH, MAX_HEIGHT } from '@/app/lib/validation';
import { renderImageResponse, getRandomCatImageUrl } from '@/app/lib/image-handler';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ width: string; height: string; format: string }> },
) {
  try {
    // 파라미터 추출
    const { width: widthStr, height: heightStr, format: formatStr } = await params;

    // 너비 유효성 검사
    const widthValidation = validateNumber(widthStr, 1, MAX_WIDTH);
    if (!widthValidation.isValid) {
      return badRequestResponse(`너비: ${widthValidation.message}`);
    }
    const width = widthValidation.value!;

    // 높이 유효성 검사
    const heightValidation = validateNumber(heightStr, 1, MAX_HEIGHT);
    if (!heightValidation.isValid) {
      return badRequestResponse(`높이: ${heightValidation.message}`);
    }
    const height = heightValidation.value!;

    // 포맷 유효성 검사
    const formatValidation = validateFormat(formatStr);
    if (!formatValidation.isValid) {
      return badRequestResponse(formatValidation.message);
    }

    // 랜덤 고양이 이미지 URL 생성
    const imageUrl = getRandomCatImageUrl();

    // 이미지 응답 렌더링
    return await renderImageResponse(imageUrl, width, height);
  } catch (error) {
    console.error('Error generating image:', error);
    return serverErrorResponse('이미지 생성 중 오류가 발생했습니다.');
  }
}
