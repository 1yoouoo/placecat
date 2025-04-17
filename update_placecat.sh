#!/bin/bash

# placecat 디렉토리로 이동
cd ~/placecat/placecat

# 변경사항 충돌 방지를 위한 현재 변경사항 저장
git stash

# 최신 코드 가져오기
git pull

# 의존성 패키지 설치
npm install

# PM2 프로세스 상태 확인
if pm2 list | grep -q "placecat"; then
  echo "placecat이 이미 실행 중입니다. 재시작합니다..."
  pm2 restart placecat
else
  echo "placecat을 시작합니다..."
  pm2 start npm --name "placecat" -- start
fi

# 성공 메시지 출력
echo "placecat 업데이트 및 재시작이 완료되었습니다." 