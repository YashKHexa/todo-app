import { Empty } from "antd";
import { useEffect } from "react";
import { useTodoStore } from "@/state/useTodoStore";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/api/todos";

const TodoList = () => {
  const response = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const filter = useTodoStore((state) => state.filter);

  useEffect(() => {
    if (response.data) setTodos(response.data);
  }, [response.data, setTodos]);

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
