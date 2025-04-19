#!/bin/bash
# 변경사항 충돌 방지를 위한 현재 변경사항 저장
git stash

# 최신 코드 가져오기
git pull

echo "nvm 버전 설정 중..."
nvm use 20

echo "npm 패키지 설치 중..."
npm install

# 빌드 실행
echo "프로젝트 빌드 중..."
npm run build

pm2 restart placecat

# 성공 메시지 출력
echo "placecat 업데이트 및 재시작이 완료되었습니다." 