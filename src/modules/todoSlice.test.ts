import {
  addTodo,
  deleteTodo,
  editTodo,
  todoInitialState,
  todoReducer,
} from "./todoSlice";

describe("todoSlice", () => {
  test("Todoの追加のテスト", () => {
    const todo = { id: "test", text: "test text", completed: false };

    const result = todoReducer(todoInitialState, addTodo(todo));

    expect(result.todoIds.length).toBe(4);
    expect(result.entities[todo.id]).toEqual(todo);
  });

  test("Todoの編集のテスト", () => {
    const todo = { id: "test", text: "test text", completed: false };

    const result = todoReducer(
      {
        ...todoInitialState,
        todoIds: [...todoInitialState.todoIds, todo.id],
        entities: {
          ...todoInitialState.entities,
          [todo.id]: todo,
        },
      },
      editTodo({ ...todo, completed: true })
    );

    expect(result.todoIds.length).toBe(4);
    expect(result.entities).toEqual({
      ...todoInitialState.entities,
      [todo.id]: {
        ...todo,
        completed: true,
      },
    });
  });

  test("Todoの削除のテスト", () => {
    const todo = { id: "test", text: "test text", completed: false };

    const result = todoReducer(
      {
        ...todoInitialState,
        todoIds: [...todoInitialState.todoIds, todo.id],
        entities: {
          ...todoInitialState.entities,
          [todo.id]: todo,
        },
      },
      deleteTodo({ id: todo.id })
    );

    expect(result.todoIds.length).toBe(3);
    expect(result.entities[todo.id]).toBeUndefined();
  });
});
