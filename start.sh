#!/bin/bash

# 1) Next.js (host) 실행
cd packages/host

# 프로덕션 실행이라면 (이미 빌드 완료했다고 가정):
nohup npm run start &

# 또는 개발 모드로 실행하려면:
# nohup npm run dev &

# 2) monorepo 루트로 복귀
cd ../../

# 3) Nginx 실행 (프로세스가 종료되지 않도록 포그라운드 모드 예시)
nginx -c "$(pwd)/nginx.conf" -g 'daemon off;'

# 만약 백그라운드로 실행하려면:
# nginx -c "$(pwd)/nginx.conf"
