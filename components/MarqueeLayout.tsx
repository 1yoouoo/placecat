'use client';

import React from 'react';
import MarqueeList from './marqueeList';

type MarqueeLayoutProps = {
  children: React.ReactNode;
};

export default function MarqueeLayout({ children }: MarqueeLayoutProps) {
  return (
    <>
      {/* 페이지 콘텐츠 렌더링 */}
      {children}

      {/* Marquee 목록 렌더링 */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <MarqueeList />
      </div>
    </>
  );
}
