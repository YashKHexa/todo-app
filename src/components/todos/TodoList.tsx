import { Empty } from "antd";
import { useTodoStore } from "@/state/useTodoStore";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
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
