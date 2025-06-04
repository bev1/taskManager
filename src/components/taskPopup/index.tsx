import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  type Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/general.types.ts";
import { Dropdown } from "../formControls/dropdown";

interface TaskPopupProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({ task, isOpen, onClose }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  const handleFieldChange = (field: keyof Task, value: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [field]: value });
    }
  };

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleSaveTaskClick = () => {
    console.log("SAVE");
  };

  const prioritiesList = Object.values(TaskPriority);
  const typesList = Object.values(TaskType);
  const statusesList = Object.values(TaskStatus);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          background: "#242424",
          border: "1px solid white",
          color: "white",
        },
      }}
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle1">Title</Typography>
            <TextField
              value={editedTask?.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white" }}
            />
            <Typography variant="subtitle1" mt={2}>
              Description
            </Typography>
            <TextField
              value={editedTask?.description || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1">Type</Typography>
            <Dropdown
              value={editedTask?.type || ""}
              onChange={(newValue) => handleFieldChange("type", newValue)}
              listItems={typesList}
            />
            <Typography variant="subtitle1" mt={2}>
              Priority
            </Typography>
            <Dropdown
              value={editedTask?.priority || ""}
              onChange={(newValue) => handleFieldChange("priority", newValue)}
              listItems={prioritiesList}
            />
            <Typography variant="subtitle1" mt={2}>
              Status
            </Typography>
            <Dropdown
              value={editedTask?.status || ""}
              onChange={(newValue) => handleFieldChange("status", newValue)}
              listItems={statusesList}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant={"contained"}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveTaskClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
