import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import type { AppDispatch } from "../../store";
import { updateOrCreateTask } from "../../store/projectSlice.ts";
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
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleFieldChange = (field: keyof Task, value: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [field]: value });
    }
    if (field === "title" && value.trim()) {
      setTitleError(false);
    }
    if (field === "description" && value.trim()) {
      setDescriptionError(false);
    }
  };

  useEffect(() => {
    setEditedTask(task);
    setTitleError(false);
    setDescriptionError(false);
  }, [task]);

  const handleSaveTaskClick = () => {
    const isTitleEmpty = !editedTask?.title?.trim();
    const isDescriptionEmpty = !editedTask?.description?.trim();

    setTitleError(isTitleEmpty);
    setDescriptionError(isDescriptionEmpty);

    if (isTitleEmpty || isDescriptionEmpty) return;

    if (projectId && editedTask) {
      dispatch(updateOrCreateTask({ projectId, updatedTask: editedTask }));
      onClose();
    }
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
          overflow: "hidden",
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
              error={titleError}
              helperText={titleError ? "Title cannot be empty" : ""}
              sx={{ backgroundColor: "white" }}
              slotProps={{
                formHelperText: {
                  sx: {
                    backgroundColor: "#242424",
                    fontSize: "16px",
                    margin: 0,
                  },
                },
              }}
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
              error={descriptionError}
              helperText={descriptionError ? "Description cannot be empty" : ""}
              sx={{ backgroundColor: "white" }}
              slotProps={{
                formHelperText: {
                  sx: {
                    backgroundColor: "#242424",
                    fontSize: "16px",
                    margin: 0,
                  },
                },
              }}
            />
            <Typography variant="subtitle1" mt={2}>
              Due Date
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={editedTask?.dueDate ? dayjs(editedTask.dueDate) : null}
                onChange={(newValue: Dayjs | null) =>
                  handleFieldChange(
                    "dueDate",
                    newValue ? newValue.format("YYYY-MM-DD") : "",
                  )
                }
                sx={{
                  backgroundColor: "white",
                }}
              />
            </LocalizationProvider>
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
