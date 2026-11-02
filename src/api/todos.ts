import type { MutationResponse, QueryResponse } from "@/types/types";
import axiosInstance from "./axios";

export const getTodos = async (): Promise<QueryResponse> => {
  const { data } = await axiosInstance.get<QueryResponse>("/tasks");
  return data;
};

export const addTodo = async (title: string): Promise<MutationResponse> => {
  const { data } = await axiosInstance.post<MutationResponse>("/tasks", {
    title,
  });
  return data;
};

export const updateTodo = async (
  id: string,
  title: string
): Promise<MutationResponse> => {
  const { data } = await axiosInstance.put<MutationResponse>(`/tasks/${id}`, {
    title,
  });
  return data;
};

export const deleteTodo = async (id: string): Promise<MutationResponse> => {
  const { data } = await axiosInstance.delete<MutationResponse>(`/tasks/${id}`);
  return data;
};

export const toggleTodoStatus = async ({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}): Promise<MutationResponse> => {
  const { data } = await axiosInstance.patch<MutationResponse>(`/tasks/${id}`, {
    isCompleted,
  });
  return data;
};

