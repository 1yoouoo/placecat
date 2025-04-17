/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

// 이미지를 렌더링하는 함수
export async function renderImageResponse(imageUrl: string, width: number, height: number): Promise<ImageResponse> {
  // 이미지를 가져와서 base64로 인코딩
  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(`이미지를 가져올 수 없습니다: ${imageResponse.status}`);
  }

  const imageBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src={dataUrl}
          alt="Place holder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      width,
      height,
      headers: {
        'content-type': 'image/png',
        'content-disposition': `inline; filename="placecat-${width}x${height}.png"`,
      },
    },
  );
}

// 랜덤 고양이 이미지 URL 생성 함수
export function getRandomCatImageUrl(total: number = 8000): string {
  const randomNumber = Math.floor(Math.random() * total) + 1;
  const formattedNumber = randomNumber.toString().padStart(6, '0');
  return `https://placecat.sgp1.cdn.digitaloceanspaces.com/placecat/cat_${formattedNumber}.jpg`;
}
