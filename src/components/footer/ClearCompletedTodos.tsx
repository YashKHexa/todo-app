import { Button, Popconfirm } from "antd";
import { useTodoStore } from "@/state/useTodoStore";

const ClearCompletedTodos = () => {
  const completedCount = useTodoStore(
    (state) => state.todos.filter((todo) => todo.completed).length,
  );
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  return (
    <Popconfirm
      title="Clear completed todos?"
      description={`This will remove ${completedCount} completed ${
        completedCount === 1 ? "todo" : "todos"
      }.`}
      onConfirm={clearCompleted}
      okText="Clear"
      okButtonProps={{ danger: true }}
      disabled={completedCount === 0}
    >
      <Button type="text" danger disabled={completedCount === 0}>
        Clear completed
      </Button>
    </Popconfirm>
  );
};

export default ClearCompletedTodos;