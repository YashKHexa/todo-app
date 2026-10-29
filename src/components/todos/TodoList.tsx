import { Empty } from "antd";
import { useTodoStore } from "@/state/useTodoStore";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/api/todos";

const TodoList = () => {
  const response = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todos = response.data?.data ?? [];

  const filter = useTodoStore((state) => state.filter);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <Empty
        className="mt-[calc(50svh-200px)]"
        description={todos.length === 0 ? "No todos yet" : "No matching todos"}
      />
    );
  }

  return (
    <ul className="flex list-none flex-col gap-2 overflow-auto">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
