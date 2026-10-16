import { useTodoStore } from "@/state/useTodoStore";

const TitleAndCount = () => {
  const todoCount = useTodoStore((state) => state.todos.length);

  return (
    <div className="inline-flex items-end gap-2">
      <span className="text-3xl font-medium">Tasks</span>
      <span className="tabular-nums text-xl font-light">[{todoCount}]</span>
    </div>
  );
};

export default TitleAndCount;
