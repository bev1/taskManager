import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  type Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/general.types.ts";

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
            <Select
              value={editedTask?.type || ""}
              onChange={(e) => handleFieldChange("type", e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white", textTransform: "capitalize" }}
            >
              {typesList.map((type) => {
                return (
                  <MenuItem sx={{ textTransform: "capitalize" }} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography variant="subtitle1" mt={2}>
              Priority
            </Typography>
            <Select
              value={editedTask?.priority || ""}
              onChange={(e) => handleFieldChange("priority", e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white", textTransform: "capitalize" }}
            >
              {prioritiesList.map((priority) => {
                return (
                  <MenuItem sx={{ textTransform: "capitalize" }} value={priority}>
                    {priority}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography variant="subtitle1" mt={2}>
              Status
            </Typography>
            <Select
              value={editedTask?.status || ""}
              onChange={(e) => handleFieldChange("status", e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white", textTransform: "capitalize" }}
            >
              {statusesList.map((status) => {
                return (
                  <MenuItem sx={{ textTransform: "capitalize" }} value={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
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
