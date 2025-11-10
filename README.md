<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# prestamype-exchange-api

Small README with steps to start this NestJS API (development, Docker, and tests).

## Prerequisites

- Node.js 18+ (or the version used in your environment)
- pnpm (preferred) or npm/yarn
- Docker & Docker Compose (only if you want to run services in containers)

Environment files
- Copy `env.example` to `.env` and set values (important: `MONGO_URI`, `JWT_SECRET`).

## Install

```powershell
pnpm install
```

## Run locally (development)

1. Ensure `.env` is present and `MONGO_URI` points to a running MongoDB instance (local or Docker).
2. Start in watch mode:

```powershell
pnpm run dev
```

Or (Nest default):
```powershell
pnpm run start:dev
```

The app will start on the port defined in your `ENV` (default is usually `3000`). Open `http://localhost:3000`.

## Run with Docker Compose

This repository includes a `docker-compose.yaml` (if present). To run the API and required services with Docker:

```powershell
docker compose up --build
```

To stop and remove containers:

```powershell
docker compose down --remove-orphans
```

If Mongo is started with Docker, set `MONGO_URI` in your `.env` to the Mongo service connection string (check `docker-compose.yaml`).

## Tests

- Run unit tests:

```powershell
pnpm test
```

- Run a single spec file:

```powershell
pnpm test -- src/user/application/userCreate.spec.ts
```

- Run e2e tests (if configured):

```powershell
pnpm run test:e2e
```

Notes:
- Jest is configured to use `ts-jest`. Path alias `@/` is mapped for tests in `package.json`.

## Lint & Format

```powershell
pnpm run lint
pnpm run format
```

## Quick API usage (Postman / curl)

1. Create / login a user (check `auth` controller paths). Example (replace host/port):

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

2. Call a protected endpoint (example: get paginated exchanges):

```bash
curl -X GET "http://localhost:3000/exchange?page=1&limit=10" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

Tip: Use Postman environment variable `{{accessToken}}` and set Authorization -> Bearer Token to `{{accessToken}}`.

## Common Troubleshooting

- Mongo $limit numeric error: query params are strings by default. Use `ParseIntPipe` or enable global `ValidationPipe({ transform: true })` so `limit`/`page` become numbers.
- 401 Unauthorized: ensure `JWT_SECRET` matches the secret used to sign tokens and that you send `Authorization: Bearer <token>`.
- Path alias issues in tests: Jest needs `moduleNameMapper` (already configured). If you add new tsconfig paths, update Jest accordingly.

## Helpful scripts

- `pnpm run dev` or `pnpm run start:dev` — start in watch mode
- `pnpm run start` — start production app (compiled)
- `pnpm run build` — compile to `dist`
- `pnpm run lint` — run ESLint
- `pnpm test` — run Jest tests

## Next steps / Improvements

- Add CI (GitHub Actions) to run lint, typecheck, and tests on PRs
- Add integration/e2e tests with `mongodb-memory-server` for DB isolation
- Add pre-commit hooks (`husky` + `lint-staged`) to enforce lint/format on commit

If you want, I can add a `docs/` folder with Postman collection and example `.env` values.

## API Endpoints

**Authentication**
- **POST** `/auth/login` : Authenticate and receive a JWT access token.

Request body (JSON):

```json
{ "email": "user@example.com", "password": "secret" }
```

Success response (200):

```json
{ "accessToken": "eyJ..." }
```

Usage (curl):

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

**Exchange**
- All exchange endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

- **GET** `/exchange?page=1&limit=10` : Get paginated exchanges for the authenticated user.
  - Query params: `page` (number, default 1), `limit` (number, default 10)
  - Response: `200` array of exchange objects.

Example (curl):

```bash
curl -X GET "http://localhost:3000/exchange?page=1&limit=10" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

- **POST** `/exchange` : Create a new exchange for the authenticated user.

Request body (JSON):

```json
{
  "exchangeType": "buy", // or "sell"
  "amountSend": 100
}
```

Success response (201/200): created exchange object:

```json
{
  "_id": "<id>",
  "exchangeType": "buy",
  "amountSend": 100,
  "amountReceive": 500,
  "exchangeRate": { "id": "rateId", "purchasePrice": 5, "salePrice": 6 },
  "userId": "<userObjectId>"
}
```

- **GET** `/exchange/:id` : Retrieve a single exchange by id (must belong to authenticated user).

- **DELETE** `/exchange/:id` : Delete an exchange (must belong to authenticated user). Returns `{ "success": true }` on success.

Notes
- The JWT payload returned by `/auth/login` is attached to `req.user` by Passport; controllers use that to scope operations to the current user.
- Ensure `JWT_SECRET` in your `.env` matches the secret used to sign tokens.

