export type IApiResponseDTO = {
  data?: unknown;
  error?: {
    data: {
      statusCode: number;
      message: string;
      errors?: Record<string, unknown>;
      error?: string;
    };
  };
};
