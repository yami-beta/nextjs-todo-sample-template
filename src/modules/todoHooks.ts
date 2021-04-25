import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";
import { addTodo, Todo } from "./todoSlice";

export const useTodos = () => {
  const todoIds = useSelector((state: RootState) => state.todo.todoIds);
  const entities = useSelector((state: RootState) => state.todo.entities);

  const todos = useMemo(() => {
    return todoIds
      .map((id) => {
        return entities[id];
      })
      .filter((todo): todo is Todo => !!todo);
  }, [entities, todoIds]);

  return [todos] as const;
};

export const useAddTodo = () => {
  const dispatch = useDispatch();

  const fn = useCallback(
    (text: string) => {
      const id = uuidv4();
      dispatch(addTodo({ id, text, completed: false }));
    },
    [dispatch]
  );

  return fn;
};
