import { Checkbox } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoStatus } from "@/api/todos";
import type { Todo } from "@/types/types";

const TodoCheckbox = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Checkbox
      checked={todo.isCompleted}
      disabled={isPending}
      onChange={(e) => mutate({ id: todo.id, isCompleted: e.target.checked })}
    />
  );
};

export default TodoCheckbox;
