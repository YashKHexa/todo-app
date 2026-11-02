import { Button } from "antd";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/todos";
import type { Todo } from "@/types/types";
import TodoCheckbox from "./TodoCheckbox";
import TodoItemTitle from "./TodoItemTitle";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: removeTodo, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <li className="group flex min-h-14 items-center gap-3 rounded-theme border border-border bg-background px-4 transition-colors hover:bg-background-secondary">
      <TodoCheckbox todo={todo} />
      <TodoItemTitle todo={todo} />
      <Button
        danger
        type="text"
        size="small"
        loading={isDeleting}
        icon={<X size={16} />}
        aria-label={`Delete "${todo.title}"`}
        onClick={() => removeTodo(todo.id)}
        className="shrink-0 text-font-secondary opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-focus-within:opacity-100"
      />
    </li>
  );
};

export default TodoItem;
