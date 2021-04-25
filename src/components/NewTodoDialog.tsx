import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { FC, useState } from "react";
import { useAddTodo } from "../modules/todoHooks";

type NewTodoDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export const NewTodoDialog: FC<NewTodoDialogProps> = ({
  open,
  handleClose,
}) => {
  const [text, setText] = useState("");
  const addTodo = useAddTodo();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>新規作成</DialogTitle>

      <DialogContent>
        <TextField
          label="text"
          fullWidth
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
        <Button
          onClick={() => {
            addTodo(text);
            setText("");
            handleClose();
          }}
          color="primary"
        >
          作成
        </Button>
      </DialogActions>
    </Dialog>
  );
};
