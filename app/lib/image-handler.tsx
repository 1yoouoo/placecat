/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

// 이미지를 렌더링하는 함수
export async function renderImageResponse(
  imageUrl: string,
  width: number,
  height: number,
  text: string = '',
  textColor: string = 'white',
): Promise<ImageResponse> {
  // 이미지를 가져와서 base64로 인코딩
  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(`이미지를 가져올 수 없습니다: ${imageResponse.status}`);
  }

  const imageBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;

  // 텍스트 길이에 따라 글자 크기 자동 조절
  const calculateFontSize = (text: string, containerWidth: number, containerHeight: number): number => {
    if (!text) return 0; // 텍스트가 없으면 0 반환

    // 줄바꿈으로 분리된 각 줄을 처리
    const lines = text.split('\n');
    const lineCount = lines.length;

    // 글자가 들어갈 유효 공간 계산 (패딩 고려)
    // 패딩은 양쪽으로 적용되므로 2배로 계산
    const paddingSize = calculatePaddingSize(Math.min(width, height));
    const paddingWidthTotal = paddingSize * 2 + 30; // 컨테이너 패딩 추가
    const paddingHeightTotal = paddingSize * 2 + 30;

    // 실제로 사용 가능한 공간
    const effectiveWidth = containerWidth - paddingWidthTotal;
    const effectiveHeight = containerHeight - paddingHeightTotal;

    // 한 글자당 차지하는 평균 공간 (한글은 영문보다 더 큰 공간 차지)
    // 한글과 영어, 숫자, 특수문자 등을 구분하여 계산
    const calculateCharWidth = (char: string): number => {
      // 한글 (더 넓은 공간 차지)
      if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(char)) {
        return 1.0;
      }
      // 영문 대문자, 특수문자
      else if (/[A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
        return 0.75;
      }
      // 영문 소문자, 숫자 등
      else {
        return 0.5;
      }
    };

    // 각 줄의 실질적인 길이 계산 (문자 종류에 따른 가중치 적용)
    const effectiveLineLengths = lines.map((line) => {
      let length = 0;
      for (let i = 0; i < line.length; i++) {
        length += calculateCharWidth(line[i]);
      }
      return length;
    });

    const maxEffectiveLineLength = Math.max(...effectiveLineLengths);

    // 너비에 맞게 폰트 크기 계산 (줄바꿈 없이 한 줄에 모두 표시)
    // 글자수와 타입을 고려한 계수 적용
    const fontSizeByWidth = effectiveWidth / (maxEffectiveLineLength * 1.2);

    // 높이 기준 계산 (줄 수 고려)
    const fontSizeByHeight = effectiveHeight / (lineCount * 1.4);

    // 이미지 비율에 따른 조정
    const aspectRatio = containerWidth / containerHeight;
    const aspectFactor = aspectRatio > 2 ? 0.85 : aspectRatio < 0.5 ? 1.1 : 1.0;

    // 최종 계산 (가장 제한적인 조건 적용)
    const calculatedSize = Math.min(fontSizeByWidth, fontSizeByHeight) * aspectFactor;

    // 텍스트 길이에 따른 추가 감소 계수 (매우 긴 텍스트에 대한 추가 조정)
    const textLengthFactor = maxEffectiveLineLength > 30 ? 0.9 : 1.0;

    // 최소 및 최대 폰트 크기 제한
    const minSize = Math.max(5, containerWidth * 0.01); // 최소 크기를 더 작게 설정
    const maxSize = Math.min(80, containerHeight * 0.15, containerWidth * 0.08);

    return Math.max(minSize, Math.min(calculatedSize * textLengthFactor, maxSize));
  };

  // 이미지 크기에 따른 패딩 계산
  const calculatePaddingSize = (dimension: number) => {
    if (dimension < 200) return 8;
    if (dimension < 400) return 12;
    return 15;
  };

  const paddingSize = calculatePaddingSize(Math.min(width, height));
  const padding = `${paddingSize}px`;
  const containerPadding = `${Math.max(10, Math.min(width, height) * 0.05)}px`;

  // 텍스트 줄바꿈 처리 (백슬래시 n을 실제 줄바꿈으로 변환)
  // 여러 형태의 줄바꿈 문자열을 처리
  const processNewlines = (inputText: string): string => {
    // 리터럴 문자열 '\n'을 실제 줄바꿈으로 변환 (정규식 이스케이프 주의)
    // \\n을 먼저 처리 (이중 백슬래시)
    let result = inputText.replace(/\\\\n/g, '\n');

    // \n 문자열을 줄바꿈으로 변환 (단일 백슬래시)
    result = result.replace(/\\n/g, '\n');

    // URL에서 '%5Cn'으로 인코딩된 경우 (이미 디코딩된 상태)
    result = result.replace(/%5Cn/gi, '\n');

    // +로 인코딩된 공백을 실제 공백으로 변환
    result = result.replace(/\+/g, ' ');

    // 디버깅을 위한 로그
    console.log('원본 텍스트:', inputText);
    console.log('처리된 텍스트:', result);
    console.log('줄바꿈 포함 여부:', result.includes('\n'));

    return result;
  };

  const formattedText = processNewlines(text);

  // 글자 크기 계산
  const fontSize = calculateFontSize(formattedText, width, height);

  // 줄 단위로 분리하여 명시적으로 줄바꿈 처리
  const textLines = formattedText.split('\n');

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
        {text && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: containerPadding,
              zIndex: 10,
            }}
          >
            <div
              style={{
                color: textColor,
                fontSize: `${fontSize}px`,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                wordBreak: 'keep-all',
                whiteSpace: 'nowrap',
                padding,
                maxWidth: '95%',
                lineHeight: '1.3',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: `${height * 0.9}px`,
              }}
            >
              {textLines.map((line, index) => (
                <div
                  key={index}
                  style={{
                    margin: index > 0 ? '0.3em 0 0 0' : '0',
                    padding: 0,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
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
