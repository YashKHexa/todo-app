import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todos = () => {
  return (
    <div className="px-7 py-5 flex flex-col gap-5 h-[calc(100%-160px)]">
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default Todos;
