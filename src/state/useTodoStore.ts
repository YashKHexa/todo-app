import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TodoFilter = "all" | "active" | "completed";

interface TodoStore {
  todos: Todo[];
  filter: TodoFilter;
  setTodos: (todos: Todo[]) => void;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string) => void;
  updateTodoTitle: (id: string, title: string) => void;
  toggleCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: "all",
  setTodos: (todos) => set({ todos }),
  setFilter: (filter) => set({ filter }),
  addTodo: (title) => {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title: normalizedTitle,
          isCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
  },
  updateTodoTitle: (id, title) => {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: normalizedTitle,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    }));
  },
  toggleCompleted: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.isCompleted),
    })),
}));
