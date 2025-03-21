#!/bin/sh

#COPY ./apps/client/start.sh ./apps/client/
#RUN chmod +x /app/apps/client/start.sh
#"run": "NEXT_PRIVATE_LOCAL_WEBPACK=true sh start.sh"
echo "NEXT_PUBLIC_IAM_URL_sh: $NEXT_PUBLIC_IAM_URL"

# 환경변수 값이 제대로 전달되었는지 확인
#if [ -z "$NEXT_PUBLIC_IAM_URL" ]; then
#  echo "ERROR: NEXT_PUBLIC_IAM_URL is not set."
#  exit 1
#fi

SERVER_JS_SEARCH="$(dirname "$0")/server.js"
SERVER_JS_EXT="server.js"

echo "SERVER_JS_SEARCH_sh: $SERVER_JS_SEARCH"
if [ ! -f "$SERVER_JS_SEARCH" ]; then
  echo "ERROR: server.js not found at $SERVER_JS_SEARCH"
fi

if [ ! -w "$SERVER_JS_SEARCH" ]; then
  echo "ERROR: $SERVER_JS_SEARCH is not writable"
fi

chmod u+w "$SERVER_JS_SEARCH" 2>/dev/null

sed -i "s#%%NEXT_PUBLIC_IAM_URL%%#$NEXT_PUBLIC_IAM_URL#g" "$SERVER_JS_SEARCH"
sed -i "s#%%NEXT_PUBLIC_VAULT_URL%%#$NEXT_PUBLIC_VAULT_URL#g" "$SERVER_JS_SEARCH"
sed -i "s#%%NEXT_PUBLIC_FABRIC_URL%%#$NEXT_PUBLIC_FABRIC_URL#g" "$SERVER_JS_SEARCH"
sed -i "s#%%NEXT_PUBLIC_KMS_URL%%#$NEXT_PUBLIC_KMS_URL#g" "$SERVER_JS_SEARCH"

# 치환 후 Next.js standalone 서버 실행
exec node "$SERVER_JS_EXT"
