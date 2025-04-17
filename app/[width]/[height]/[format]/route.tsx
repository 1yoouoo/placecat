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
    const searchParams = request.nextUrl.searchParams;

    // 텍스트 파라미터를 가져와서 URL 디코딩 처리
    let text = searchParams.get('text') || '';
    try {
      // URL 인코딩된 텍스트 디코딩 (+ 기호 등을 처리)
      text = decodeURIComponent(text);
    } catch (e) {
      // 디코딩 오류가 발생한 경우 원본 텍스트 사용
      console.warn('텍스트 디코딩 오류:', e);
    }

    const textColor = searchParams.get('color') || 'white';

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

    // 이미지 응답 렌더링 (텍스트 포함)
    return await renderImageResponse(imageUrl, width, height, text, textColor);
  } catch (error) {
    console.error('Error generating image:', error);
    return serverErrorResponse('이미지 생성 중 오류가 발생했습니다.');
  }
}
