SHELL := /bin/sh

.PHONY: install dev workers typecheck lint test db-generate db-migrate infra-up infra-down

install:
	pnpm install

dev:
	pnpm dev

workers:
	pnpm workers:dev

typecheck:
	pnpm typecheck

lint:
	pnpm lint

test:
	pnpm test

db-generate:
	pnpm db:generate

db-migrate:
	pnpm db:migrate

infra-up:
	docker compose up db redis storage

infra-down:
	docker compose down
