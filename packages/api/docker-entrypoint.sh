#!/bin/sh
set -o errexit
set -o pipefail
set -u

DB_HOST=${DB_HOSTNAME:-}
DB_PORT=${DB_PORT:=5432}
NO_MIGRATE=${DB_NO_MIGRATE:-}

# Run database migrations
if [ -n "$DB_HOST" ] && [ -z "$NO_MIGRATE" ]; then
  dockerize -wait tcp://$DB_HOST:$DB_PORT -timeout 30s npm run db:migrate
fi

exec "$@"
