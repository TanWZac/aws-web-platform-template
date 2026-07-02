export interface HealthResponse {
  status: string;
  app?: string;
  environment?: string;
  version?: string;
}

export interface ExampleResponse {
  message: string;
}

export interface ApiResult<TData> {
  data: TData | null;
  error: string | null;
}
