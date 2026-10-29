import { getTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

const TitleAndCount = () => {
  const response = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todoCount = response.data?.data.length ?? 0;

  return (
    <div className="inline-flex items-end gap-2">
      <span className="text-3xl font-medium">Tasks</span>
      <span className="tabular-nums text-xl font-light">[{todoCount}]</span>
    </div>
  );
};

export default TitleAndCount;
