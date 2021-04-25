import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { NextPage } from "next";
import { useState } from "react";
import { NewTodoDialog } from "../components/NewTodoDialog";
import { useDeleteTodo, useTodos } from "../modules/todoHooks";

const TodosPage: NextPage<{}> = () => {
  const [todos] = useTodos();
  const deleteTodo = useDeleteTodo();

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
            <ListItem dense button key={todo.id}>
              <ListItemIcon>
                <Checkbox checked={todo.completed} disableRipple />
              </ListItemIcon>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => alert("未実装")}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
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
