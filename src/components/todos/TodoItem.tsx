import { Button, Checkbox } from "antd";
import { X } from "lucide-react";
import { useTodoStore, type Todo } from "@/state/useTodoStore";
import TodoItemTitle from "./TodoItemTitle";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const toggleCompleted = useTodoStore((state) => state.toggleCompleted);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="group flex min-h-14 items-center gap-3 rounded-theme border border-border bg-background px-4 transition-colors hover:bg-background-secondary">
      <Checkbox
        checked={todo.isCompleted}
        onChange={() => toggleCompleted(todo.id)}
        aria-label={`Mark "${todo.title}" as ${
          todo.isCompleted ? "incomplete" : "complete"
        }`}
      />
      <TodoItemTitle todo={todo} />
      <Button
        danger
        type="text"
        size="small"
        icon={<X size={16} />}
        aria-label={`Delete "${todo.title}"`}
        onClick={() => deleteTodo(todo.id)}
        className="shrink-0 text-font-secondary opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-focus-within:opacity-100"
      />
    </li>
  );
};

export default TodoItem;
