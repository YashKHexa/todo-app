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
