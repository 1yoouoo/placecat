'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { Marquee } from './magicui/marquee';
import Image from 'next/image';

const MarqueeList = () => {
  const [catImages, setCatImages] = useState<string[]>([]);

  useEffect(() => {
    const newImages = [];
    for (let i = 0; i < 18; i++) {
      const randomNum = Math.floor(Math.random() * 10000) + 1;
      const formattedNum = randomNum.toString().padStart(6, '0');
      newImages.push(`https://placecat.sgp1.cdn.digitaloceanspaces.com/placecat/cat_${formattedNum}.jpg`);
      setCatImages(newImages);
    }
  }, []);

  return (
    <div className="space-y-4 flex flex-col items-center">
      <Marquee pauseOnHover>
        {catImages.slice(0, 6).map((img, index) => (
          <Image
            key={`row1-${index}`}
            src={img}
            alt={`Cat ${index + 1}`}
            width={384}
            height={216}
            className="mx-2 w-[384px] h-[216px] rounded-sm"
            priority
          />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover>
        {catImages.slice(6, 12).map((img, index) => (
          <Image
            key={`row2-${index}`}
            src={img}
            alt={`Cat ${index + 7}`}
            width={384}
            height={216}
            className="mx-2 w-[384px] h-[216px] rounded-sm"
            priority
          />
        ))}
      </Marquee>

      <Marquee pauseOnHover>
        {catImages.slice(12, 18).map((img, index) => (
          <Image
            key={`row3-${index}`}
            src={img}
            alt={`Cat ${index + 13}`}
            width={384}
            height={216}
            className="mx-2 w-[384px] h-[216px] rounded-sm"
            priority
          />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeList;
