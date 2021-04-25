import { addTodo, todoInitialState, todoReducer } from "./todoSlice";

describe("todoSlice", () => {
  test("Todoの追加のテスト", () => {
    const todo = { id: "test", text: "test text", completed: false };

    const result = todoReducer(todoInitialState, addTodo(todo));

    expect(result.todoIds.length).toBe(4);
    expect(result.entities[todo.id]).toEqual(todo);
  });

  test.todo("Todoの編集のテスト");
  test.todo("Todoの削除のテスト");
});
