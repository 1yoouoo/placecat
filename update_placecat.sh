#!/bin/bash
# 변경사항 충돌 방지를 위한 현재 변경사항 저장
git stash

# 최신 코드 가져오기
git pull

# PM2 설치 확인 및 설치
if ! command -v pm2 &> /dev/null; then
  echo "pm2가 설치되어 있지 않습니다. 설치를 진행합니다..."
  npm install -g pm2
fi

# 메모리 부족 문제 해결을 위한 NODE_OPTIONS 설정
export NODE_OPTIONS="--max-old-space-size=512"

# 의존성 패키지 설치 (실패시 --no-optional 옵션 시도)
echo "npm 패키지 설치 중..."
npm install || npm install --no-optional

# 빌드 실행
echo "프로젝트 빌드 중..."
npm run build

# PM2 프로세스 상태 확인 및 무중단 배포
if pm2 list | grep -q "placecat"; then
  echo "placecat을 무중단 재배포합니다..."
  pm2 reload placecat
else
  echo "placecat을 시작합니다..."
  pm2 start npm --name "placecat" -- start
fi

# 인스턴스 수를 1개로 유지
pm2 scale placecat 1

# 성공 메시지 출력
echo "placecat 업데이트 및 재시작이 완료되었습니다." 