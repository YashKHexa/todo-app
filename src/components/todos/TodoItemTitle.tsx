import { useState } from "react";
import { Input } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoTitle } from "@/api/todos";
import type { Todo } from "@/types/types";
import { cn } from "@/utils/cn";

const TodoItemTitle = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTodoTitle(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false);
    },
  });

  const startEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(true);
  };

  const saveTitle = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed || trimmed === todo.title) {
      setDraftTitle(todo.title);
      setIsEditing(false);
      return;
    }
    mutate({ id: todo.id, title: trimmed });
  };

  const cancelEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Input
        autoFocus
        disabled={isPending}
        aria-label={`Edit "${todo.title}"`}
        value={draftTitle}
        onChange={(event) => setDraftTitle(event.target.value)}
        onPressEnter={saveTitle}
        onBlur={saveTitle}
        onKeyDown={(event) => {
          if (event.key === "Escape") cancelEditing();
        }}
        className="min-w-0 flex-1"
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onDoubleClick={startEditing}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") startEditing();
      }}
      className={cn(
        "min-w-0 flex-1 wrap-break-words text-sm cursor-pointer select-none",
        todo.isCompleted && "text-font-secondary line-through"
      )}
    >
      {todo.title}
    </span>
  );
};

export default TodoItemTitle;