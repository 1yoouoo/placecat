import { NextResponse } from 'next/server';

export type ErrorResponseType = {
  status: number;
  message: string;
};

// 일반적인 HTTP 에러 응답 생성 함수
export function createErrorResponse(status: number, message: string): NextResponse {
  return new NextResponse(
    JSON.stringify({
      status,
      message,
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 400 Bad Request 에러
export function badRequestResponse(message: string = '잘못된 요청입니다.'): NextResponse {
  return createErrorResponse(400, message);
}

// 404 Not Found 에러
export function notFoundResponse(message: string = '요청한 리소스를 찾을 수 없습니다.'): NextResponse {
  return createErrorResponse(404, message);
}

// 500 Internal Server Error
export function serverErrorResponse(message: string = '서버 오류가 발생했습니다.'): NextResponse {
  return createErrorResponse(500, message);
}
