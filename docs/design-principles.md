# Design Principles

## 1. Keep the Frontend Thin

The frontend should handle user experience, navigation, and API calls. Business rules should live in the backend.

## 2. Use Environment-Based API URLs

Use `NEXT_PUBLIC_API_BASE_URL` for each environment:

- local
- dev
- stage
- prod

## 3. Prefer Static Hosting First

For dashboards and internal tools, static hosting on S3 and CloudFront is simple, cheap, and scalable.

Use a server-rendered deployment only when the product needs dynamic server-side rendering.

## 4. Keep Auth Replaceable

Start with a login placeholder. Later, connect it to Cognito, SSO, or your identity provider.

## 5. Separate UI and API Logic

- `components/`: reusable UI
- `app/`: pages and routing
- `lib/api-client.ts`: backend API calls
- `types/`: shared response contracts

## 6. Match Backend Contracts

Frontend routes should be based on backend API contracts. The default backend template exposes:

- `/health/ready`
- `/api/v1/example`
