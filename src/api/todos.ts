import type { TasksResponse } from "@/types/types";
import axiosInstance from "./axios";

export const getTodos = async (): Promise<TasksResponse> => {
  const { data } = await axiosInstance.get<TasksResponse>("/tasks");
  return data;
};
