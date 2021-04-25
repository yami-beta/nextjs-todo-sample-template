import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoState = {
  todoIds: string[];
  entities: Record<string, Todo>;
};

const todos = [
  { id: uuidv4(), text: "todo0", completed: false },
  { id: uuidv4(), text: "todo1", completed: false },
  { id: uuidv4(), text: "todo2", completed: false },
] as const;

export const todoInitialState: TodoState = {
  todoIds: todos.map((todo) => todo.id),
  entities: {
    [todos[0].id]: todos[0],
    [todos[1].id]: todos[1],
    [todos[2].id]: todos[2],
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;

      const todoIds = [...state.todoIds, todo.id];
      const entities = {
        ...state.entities,
        [todo.id]: todo,
      };

      return {
        ...state,
        todoIds,
        entities,
      };
    },
  },
});

export const { addTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
