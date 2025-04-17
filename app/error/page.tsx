import { Metadata } from 'next';
import Link from 'next/link';
import { MAX_WIDTH, MAX_HEIGHT, SUPPORTED_FORMATS } from '@/app/lib/validation';

// Dynamic metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string; requested?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const code = params.code || '400';

  return {
    title: `Error ${code} - placecat`,
    description: 'An error occurred while processing your request.',
  };
}

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string; requested?: string; format?: string }>;
}) {
  const params = await searchParams;
  const code = params.code || '400';
  const message = params.message || 'An unknown error occurred.';
  const requested = params.requested || '';
  const format = params.format || '';

  // Suggest solution based on error type
  let suggestion = '';

  if (message.includes('width') && message.includes('maximum')) {
    suggestion = `The maximum width supported is ${MAX_WIDTH}px.`;
  } else if (message.includes('height') && message.includes('maximum')) {
    suggestion = `The maximum height supported is ${MAX_HEIGHT}px.`;
  } else if (message.includes('format')) {
    suggestion = `Supported image formats: ${SUPPORTED_FORMATS.join(', ')}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-200">
      <div
        className="p-8 bg-gray-900 rounded-lg shadow-xl max-w-md w-full text-center border border-gray-800"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          background: 'linear-gradient(to bottom, rgb(17 24 39), rgb(3 7 18))',
        }}
      >
        <h1 className="text-6xl font-bold text-red-500 mb-6 [text-shadow:0_0_10px_rgba(239,68,68,0.7)]">{code}</h1>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">An Error Occurred</h2>
        <p className="text-gray-300 mb-8">{message}</p>

        {requested && (
          <div
            className="bg-gray-800 p-4 rounded-md mb-6 border border-gray-700"
            style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            <p className="text-sm text-gray-300 font-mono">
              Requested value: <span className="font-bold text-white">{requested}</span>
              {format && (
                <>
                  {' '}
                  <span className="text-gray-400">({format})</span>
                </>
              )}
            </p>
          </div>
        )}

        {suggestion && (
          <div
            className="bg-blue-950 p-4 rounded-md mb-8 text-sm text-blue-200 border border-blue-900"
            style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            <p>{suggestion}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-indigo-800 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg border border-indigo-700"
            >
              Return to Home
            </Link>
          </div>

          <div className="text-sm text-gray-500 mt-8 p-3 bg-gray-950 rounded-md border border-gray-800">
            <p>
              Correct image URL format: <span className="text-gray-400">/[width]/[height]/[format]</span>
            </p>
            <p className="mt-2">
              Example:{' '}
              <Link href="/300/200/png" className="text-blue-400 hover:text-blue-300 underline">
                /300/200/png
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
