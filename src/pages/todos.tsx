import { Button, List } from "@material-ui/core";
import { NextPage } from "next";
import { useState } from "react";
import { NewTodoDialog } from "../components/NewTodoDialog";
import { TodoListItem } from "../components/TodoListItem";
import { useTodos } from "../modules/todoHooks";

const TodosPage: NextPage<{}> = () => {
  const [todos] = useTodos();

  const [show, setShow] = useState(false);

  return (
    <div>
      <h2>Todo 一覧</h2>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShow(true);
          }}
        >
          新規作成
        </Button>
      </div>
      <div>
        <List>
          {todos.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </List>
      </div>

      <NewTodoDialog
        open={show}
        handleClose={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default TodosPage;
