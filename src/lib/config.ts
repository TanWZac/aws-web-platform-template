export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "AWS Web Platform Template",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "local",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
};
