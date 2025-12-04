#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env-config.js
window.__ENV__ = window.__ENV__ || {};
window.__ENV__.FE_BACKEND_API = "${FE_BACKEND_API}";
EOF

exec nginx -g 'daemon off;'
