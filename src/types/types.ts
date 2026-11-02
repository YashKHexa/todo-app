export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BaseResponse {
  status: string;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface QueryResponse extends BaseResponse {
  data: Todo[];
}

export interface MutationResponse extends BaseResponse {
  data: Todo;
}