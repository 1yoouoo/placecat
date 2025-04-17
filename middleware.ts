import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateNumber, validateFormat, MAX_WIDTH, MAX_HEIGHT, MIN_WIDTH, MIN_HEIGHT } from './app/lib/validation';

// Image path pattern (e.g., /300/200/png, /asd/asd/png, etc.)
const IMAGE_PATH_PATTERN = /^\/([^/]+)\/([^/]+)\/([^/]+)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request matches the image path pattern (3-level path)
  const match = pathname.match(IMAGE_PATH_PATTERN);
  if (!match) {
    return NextResponse.next();
  }

  // Extract each part of the path
  const [, widthPart, heightPart, formatPart] = match;

  // 1. Validate width
  const widthValidation = validateNumber(widthPart, MIN_WIDTH, MAX_WIDTH);
  if (!widthValidation.isValid) {
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('code', '400');
    errorUrl.searchParams.set('message', `Width: ${widthValidation.message}`);
    errorUrl.searchParams.set('requested', `${widthPart}x${heightPart}`);
    errorUrl.searchParams.set('format', formatPart);

    return NextResponse.redirect(errorUrl);
  }

  // 2. Validate height
  const heightValidation = validateNumber(heightPart, MIN_HEIGHT, MAX_HEIGHT);
  if (!heightValidation.isValid) {
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('code', '400');
    errorUrl.searchParams.set('message', `Height: ${heightValidation.message}`);
    errorUrl.searchParams.set('requested', `${widthPart}x${heightPart}`);
    errorUrl.searchParams.set('format', formatPart);

    return NextResponse.redirect(errorUrl);
  }

  // 3. Validate format
  const formatValidation = validateFormat(formatPart);
  if (!formatValidation.isValid) {
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('code', '400');
    errorUrl.searchParams.set('message', formatValidation.message || 'Unsupported image format.');
    errorUrl.searchParams.set('requested', `${widthPart}x${heightPart}`);
    errorUrl.searchParams.set('format', formatPart);

    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to 3-level path patterns (e.g., /anything/anything/anything)
    // excluding specific patterns
    '/:first/:second/:third',
    // Exclude these paths
    '/(api|_next/static|_next/image|error|favicon.ico)/:path*',
  ],
};
