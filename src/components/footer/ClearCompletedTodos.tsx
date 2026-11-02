import { Button, Popconfirm } from "antd";
import {useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; 
import {getTodos, deleteTodo} from "@/api/todos";    
import type { Todo } from "@/types/types";


const ClearCompletedTodos = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  
  const todos = data?.data ?? [];
  const completedTodos = todos.filter((todo: Todo) => todo.isCompleted);
  const completedCount = completedTodos.length;

  const { mutate: clearCompleted, isPending } = useMutation({
    mutationFn: async () => {
      await Promise.all(
        completedTodos.map((todo: Todo) => deleteTodo(todo.id))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  
  return (
    <Popconfirm
      title="Clear completed todos?"
      description={`This will remove ${completedCount} completed ${
        completedCount === 1 ? "todo" : "todos"
      }.`}
      onConfirm={() => clearCompleted()}
      okText="Clear"
      okButtonProps={{ danger: true, loading: isPending }}
      disabled={completedCount === 0 || isPending}
    >
      <Button
        type="text"
        danger
        loading={isPending}
        disabled={completedCount === 0 || isPending}
      >
        Clear completed
      </Button>
    </Popconfirm>
  );
};

export default ClearCompletedTodos;