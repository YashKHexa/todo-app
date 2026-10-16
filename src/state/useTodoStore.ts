import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type TodoFilter = "all" | "active" | "completed";

interface TodoStore {
  todos: Todo[];
  filter: TodoFilter;
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
          completed: false,
          createdAt: Date.now(),
        },
      ],
    }));
  },
  updateTodoTitle: (id, title) => {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title: normalizedTitle } : todo,
      ),
    }));
  },
  toggleCompleted: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));
