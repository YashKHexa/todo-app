export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  status: string;
  statusCode: number;
  message: string;
  data: Todo[];
  timestamp: string;
  path: string;
}