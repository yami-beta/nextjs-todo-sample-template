import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FC, useState } from "react";
import { useDeleteTodo, useEditTodo } from "../modules/todoHooks";
import { Todo } from "../modules/todoSlice";
import { EditTodoDialog } from "./EditTodoDialog";

type TodoListItemProps = {
  todo: Todo;
};

export const TodoListItem: FC<TodoListItemProps> = ({ todo }) => {
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo();

  const [show, setShow] = useState(false);

  return (
    <>
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
              setShow(true);
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

      <EditTodoDialog
        open={show}
        handleClose={() => {
          setShow(false);
        }}
        todo={todo}
      />
    </>
  );
};
