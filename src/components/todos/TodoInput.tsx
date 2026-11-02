import { useState } from "react";
import { Input } from "antd";
import { CornerDownLeft, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

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
  const queryClient = useQueryClient();

  const { mutate: addTodo, isPending } = useMutation({
    mutationFn: async (newTitle: string) => {
      const { data } = await axiosInstance.post("/tasks", { title: newTitle });
      return data;
    },
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handlePressEnter = () => {
    const trimmed = title.trim();
    if (!trimmed || isPending) return;

    addTodo(trimmed);
  };

  return (
    <div>
      <Input
        disabled={isPending}
        prefix={<Plus strokeWidth={1} />}
        suffix={<EnterSuffix />}
        size="large"
        placeholder={isPending ? "Adding task..." : "What needs to be done?"}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onPressEnter={handlePressEnter}
      />
    </div>
  );
};

export default TodoInput;