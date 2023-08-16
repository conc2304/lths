export type CommonResponse = {
  success: boolean;
  message: string;
  error?: {
    statusCode: number;
    type: string;
    timestamp: string;
    path: string;
  };
};
