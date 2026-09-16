#!/usr/bin/env bash
# Rebuild the website from the latest PivotTFT build and ship it to the
# container (www.pivottft.com). Run from Git Bash on Windows:
#
#   cd ../PivotTFT && npm run build      # first, if the app changed
#   ./deploy-site.sh
#
# Runs sync-site.mjs (index.html/404.html + js/ + css/), then tars the site
# into /opt/pivottft/site (atomic directory swap) and restarts the server so
# it picks up the new shell. Per-comp pages and the sitemap come from the
# database at request time.
#
# This IS the production deploy for www.pivottft.com — pushing this repo to
# GitHub no longer deploys anything.
set -euo pipefail

HOST=${PIVOTTFT_HOST:-root@192.168.0.54}
cd "$(dirname "$0")"

if [ ! -f ../PivotTFT/dist/desktop.html ]; then
  echo "!! ../PivotTFT/dist/desktop.html missing — run 'npm run build' in PivotTFT first" >&2
  exit 1
fi

node sync-site.mjs

# The bundle is public — the Riot key must never be in it.
if grep -rq "RGAPI-" js/ index.html; then
  echo "!! RGAPI string found in the built site — refusing to deploy" >&2
  exit 1
fi

echo "ship to $HOST"
tar czf - \
  index.html 404.html css js img icons \
  robots.txt riot.txt manifest.json \
  | ssh "$HOST" 'set -e
    rm -rf /opt/pivottft/site.new
    mkdir -p /opt/pivottft/site.new
    tar xzf - --no-same-owner -C /opt/pivottft/site.new
    chown -R pivottft:pivottft /opt/pivottft/site.new
    rm -rf /opt/pivottft/site.old
    [ -d /opt/pivottft/site ] && mv /opt/pivottft/site /opt/pivottft/site.old
    mv /opt/pivottft/site.new /opt/pivottft/site
    rm -rf /opt/pivottft/site.old
    systemctl restart pivottft
    sleep 1
    curl -sf -o /dev/null http://127.0.0.1:8788/ && echo "site :8788 OK"'
