import { useState } from "react";
import { Input } from "antd";
import { useTodoStore, type Todo } from "@/state/useTodoStore";
import { cn } from "@/utils/cn";

const TodoItemTitle = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const updateTodoTitle = useTodoStore((state) => state.updateTodoTitle);

  const startEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(true);
  };

  const saveTitle = () => {
    updateTodoTitle(todo.id, draftTitle);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Input
        autoFocus
        aria-label={`Edit "${todo.title}"`}
        value={draftTitle}
        onChange={(event) => setDraftTitle(event.target.value)}
        onPressEnter={saveTitle}
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
        "min-w-0 flex-1 wrap-break-words text-sm",
        todo.completed && "text-font-secondary line-through",
      )}
    >
      {todo.title}
    </span>
  );
};

export default TodoItemTitle;
