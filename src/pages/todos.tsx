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
import { EditTodoDialog } from "../components/EditTodoDialog";
import { NewTodoDialog } from "../components/NewTodoDialog";
import { useDeleteTodo, useEditTodo, useTodos } from "../modules/todoHooks";
import { Todo } from "../modules/todoSlice";

const TodosPage: NextPage<{}> = () => {
  const [todos] = useTodos();
  const deleteTodo = useDeleteTodo();

  const [show, setShow] = useState(false);

  const [editTodoState, setEditTodoState] = useState<{
    show: boolean;
    todo?: Todo;
  }>({
    show: false,
  });

  const editTodo = useEditTodo();

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
                <Checkbox
                  checked={todo.completed}
                  disableRipple
                  onChange={(_, checked) => {
                    editTodo({
                      ...todo,
                      completed: checked,
                    });
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditTodoState({
                      show: true,
                      todo: todo,
                    });
                  }}
                >
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

      {editTodoState.todo && (
        <EditTodoDialog
          open={editTodoState.show}
          handleClose={() => {
            setEditTodoState((prev) => {
              return {
                ...prev,
                show: false,
              };
            });
          }}
          todo={editTodoState.todo}
        />
      )}
    </div>
  );
};

export default TodosPage;
