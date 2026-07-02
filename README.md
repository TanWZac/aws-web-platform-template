# AWS Web Platform Template

A reusable Next.js and TypeScript frontend template for AWS-hosted platforms.

This repo is the web application companion to:

- `aws-tf`: Terraform infrastructure template
- `aws-python-platform-template`: Python backend API template

The frontend gives users a browser-based entry point into the platform, while the Python backend provides APIs and platform logic.

## Platform Architecture

```text
User Browser
  |
  v
CloudFront
  |
  v
S3 Static Frontend
  |
  v
FastAPI Backend API via ALB or API Gateway
  |
  v
ECS services, workers, databases, and AI services
```

## What This Template Includes

- Next.js App Router
- TypeScript
- Static export mode for S3 and CloudFront hosting
- Dashboard shell with sidebar and header
- Login page placeholder
- Backend health and status page
- API client for the Python backend
- Environment configuration through `NEXT_PUBLIC_API_BASE_URL`
- Dockerfile for local container preview
- AWS deployment notes
- CI command notes in `docs/ci.md`

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Connect to Python Backend

Set your backend API URL:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

For deployed environments:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.your-platform.com
```

The status page is intended to connect to:

```text
GET /health/ready
GET /api/v1/example
```

These match the default routes in `aws-python-platform-template`.

## Build

```bash
npm run typecheck
npm run build
```

The static export output is generated in:

```text
out/
```

## AWS Hosting Mapping

| Frontend Concern | AWS Mapping |
| --- | --- |
| Static Next.js export | S3 website bucket |
| Global delivery | CloudFront |
| TLS certificate | ACM |
| Custom domain | Route 53 |
| Backend API URL | ALB or API Gateway URL |
| Logs | CloudFront and S3 access logs |

## Recommended Deployment Flow

1. Build frontend with the environment-specific API URL.
2. Upload `out/` to S3.
3. Invalidate CloudFront cache.
4. Confirm frontend can call backend `/health/ready`.
5. Confirm user flows from login, dashboard, and status pages.

## Future Production Additions

- Amazon Cognito login
- role-based navigation
- feature flags
- API session handling
- design system components
- observability dashboard
