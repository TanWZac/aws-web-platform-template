# AWS Deployment Notes

This frontend template is optimized for static hosting on S3 and CloudFront.

## Recommended AWS Services

- S3 for static web assets
- CloudFront for global delivery
- ACM for TLS certificates
- Route 53 for custom domains
- ALB or API Gateway for the backend API
- Terraform for repeatable infrastructure

## Required Environment Variable

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.your-platform.com
```

For local development with the Python backend template:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Build Output

```bash
npm install
npm run build
```

The static output is created in:

```text
out/
```

## Upload to S3

```bash
aws s3 sync out/ s3://your-frontend-bucket --delete
```

## Invalidate CloudFront

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Backend API Connection

The frontend expects the backend to expose:

```text
/health/ready
/api/v1/example
```

These endpoints match the default `aws-python-platform-template` service.

## Production Checklist

- custom domain configured
- HTTPS enabled
- frontend bucket blocks direct public write access
- CloudFront cache invalidation configured in deployment
- backend API CORS allows frontend origin
- environment-specific API URLs configured
- authentication integrated when required
