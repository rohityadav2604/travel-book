#!/usr/bin/env sh
set -eu

S3_ENDPOINT="${S3_ENDPOINT:-http://localhost:9000}"
S3_ACCESS_KEY_ID="${S3_ACCESS_KEY_ID:-minioadmin}"
S3_SECRET_ACCESS_KEY="${S3_SECRET_ACCESS_KEY:-minioadmin}"
S3_RAW_BUCKET="${S3_RAW_BUCKET:-memorybook-raw}"
S3_PUBLIC_BUCKET="${S3_PUBLIC_BUCKET:-memorybook-public}"
S3_EPHEMERAL_BUCKET="${S3_EPHEMERAL_BUCKET:-memorybook-ephemeral}"
MC_ALIAS="${MC_ALIAS:-memorybook-local}"

if ! command -v mc >/dev/null 2>&1; then
  echo "MinIO client 'mc' is required. Install it or run this script inside a minio/mc container."
  exit 1
fi

mc alias set "$MC_ALIAS" "$S3_ENDPOINT" "$S3_ACCESS_KEY_ID" "$S3_SECRET_ACCESS_KEY"
mc mb --ignore-existing "$MC_ALIAS/$S3_RAW_BUCKET"
mc mb --ignore-existing "$MC_ALIAS/$S3_PUBLIC_BUCKET"
mc mb --ignore-existing "$MC_ALIAS/$S3_EPHEMERAL_BUCKET"
mc anonymous set download "$MC_ALIAS/$S3_PUBLIC_BUCKET"
