import type { Todo } from "@/state/useTodoStore";
import axiosInstance from "./axios";


export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axiosInstance.get<Todo[]>("/tasks");
  return data;
};
