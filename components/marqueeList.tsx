'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { Marquee } from './magicui/marquee';
import Image from 'next/image';

const MarqueeList = () => {
  const [catImages, setCatImages] = useState<string[]>([]);

  useEffect(() => {
    // 18개의 랜덤 이미지 URL 생성
    const newImages = [];
    for (let i = 0; i < 18; i++) {
      const randomNum = Math.floor(Math.random() * 10000) + 1;
      const formattedNum = randomNum.toString().padStart(6, '0');
      // 각 이미지마다 다른 타임스탬프 추가하여 캐싱 방지
      newImages.push(`https://placecat.sgp1.cdn.digitaloceanspaces.com/placecat/cat_${formattedNum}.jpg`);
      setCatImages(newImages);
    }
  }, []);

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* 첫번째 줄 */}
      <Marquee>
        {catImages.slice(0, 6).map((img, index) => (
          <Image
            key={`row1-${index}`}
            src={img}
            alt={`Cat ${index + 1}`}
            width={300}
            height={300}
            className="mx-2"
            priority
          />
        ))}
      </Marquee>

      {/* 두번째 줄 - 반대 방향으로 이동 */}
      <Marquee reverse>
        {catImages.slice(6, 12).map((img, index) => (
          <Image
            key={`row2-${index}`}
            src={img}
            alt={`Cat ${index + 7}`}
            width={300}
            height={300}
            className="mx-2"
            priority
          />
        ))}
      </Marquee>

      {/* 세번째 줄 */}
      <Marquee>
        {catImages.slice(12, 18).map((img, index) => (
          <Image
            key={`row3-${index}`}
            src={img}
            alt={`Cat ${index + 13}`}
            width={300}
            height={300}
            className="mx-2"
            priority
          />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeList;
