import { useState } from "react";
import { Input } from "antd";
import { CornerDownLeft, Plus } from "lucide-react";
import { useTodoStore } from "@/state/useTodoStore";

const EnterSuffix = () => {
  return (
    <div className="bg-background-secondary text-font-secondary rounded px-2 py-1 flex items-end gap-1 text-xs">
      <CornerDownLeft className="size-3" />
      Enter
    </div>
  );
};

const TodoInput = () => {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handlePressEnter = () => {
    if (!title.trim()) return;

    addTodo(title);
    setTitle("");
  };

  return (
    <div>
      <Input
        prefix={<Plus strokeWidth={1} />}
        suffix={<EnterSuffix />}
        size="large"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onPressEnter={handlePressEnter}
      />
    </div>
  );
};

export default TodoInput;
