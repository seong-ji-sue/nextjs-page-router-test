#!/bin/sh

export PORT=${NEXT_PUBLIC_TABLE_PORT:-$PORT}
SERVER_JS_EXT="server.js"

exec node "$SERVER_JS_EXT"
