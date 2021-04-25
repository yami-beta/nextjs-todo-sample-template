import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { FC, useState } from "react";
import { useEditTodo } from "../modules/todoHooks";
import { Todo } from "../modules/todoSlice";

type EditTodoDialogProps = {
  open: boolean;
  handleClose: () => void;
  todo: Todo;
};

export const EditTodoDialog: FC<EditTodoDialogProps> = ({
  open,
  handleClose,
  todo,
}) => {
  const [draftTodo, setDraftTodo] = useState(todo);

  const editTodo = useEditTodo();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>編集</DialogTitle>

      <DialogContent>
        <TextField
          label="text"
          fullWidth
          value={draftTodo.text}
          onChange={(event) => {
            setDraftTodo((prev) => {
              return {
                ...prev,
                text: event.target.value,
              };
            });
          }}
        />
        <FormControlLabel
          value={todo.completed}
          label="完了"
          onChange={(_, checked) => {
            setDraftTodo((todo) => {
              return {
                ...todo,
                completed: checked,
              };
            });
          }}
          control={<Checkbox color="primary" />}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
        <Button
          onClick={() => {
            editTodo(draftTodo);
            handleClose();
          }}
          color="primary"
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};
