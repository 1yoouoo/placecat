'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">오류</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">치명적인 오류가 발생했습니다</h2>
            <p className="text-gray-600 mb-6">죄송합니다. 애플리케이션에 문제가 발생했습니다.</p>
            <button
              onClick={() => reset()}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
