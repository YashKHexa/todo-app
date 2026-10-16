import ClearCompletedTodos from "./ClearCompletedTodos";
import TodoFilter from "./TodoFilter";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-5 px-7 py-5">
      <TodoFilter />
      <ClearCompletedTodos />
    </div>
  );
};

export default Footer;
