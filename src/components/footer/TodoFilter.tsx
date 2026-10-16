
import { Segmented } from "antd";
import {
  useTodoStore,
  type TodoFilter as TodoFilterValue,
} from "@/state/useTodoStore";

const options: { label: string; value: TodoFilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const TodoFilter = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <Segmented
      aria-label="Filter todos"
      options={options}
      value={filter}
      onChange={(value) => {
        if (value === "all" || value === "active" || value === "completed") {
          setFilter(value);
        }
      }}
      size="small"
    />
  );
};

export default TodoFilter;