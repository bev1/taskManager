import { type FC, useState } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import type { AppDispatch } from "../../store";
import { removeTaskFromProject } from "../../store/projectSlice.ts";
import { type Task, TaskPriority, TaskStatus } from "../../types/general.types.ts";
import { CheckboxControl } from "../formControls/checkbox";
import { Dropdown } from "../formControls/dropdown";
import TaskPopup from "../taskPopup";


import { getFilteredAndSortedTasks } from "./helpers.ts";



export const TasksList: FC<{ tasks: Task[] }> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"priority" | "status" | undefined>();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]); // Фильтры по приоритетам
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
    setIsPopupOpen(false);
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(removeTaskFromProject({ projectId, taskId: task.id }));
  };

  const filteredAndSortedTasks = getFilteredAndSortedTasks(tasks, {
    priorities: selectedPriorities,
    statuses: selectedStatuses,
    sortBy,
  });

  const priorities = Object.values(TaskPriority);
  const statuses = Object.values(TaskStatus);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, md: 4 }}>
          <Typography variant="h6">Filters</Typography>
          <Divider color={"white"} />
          <Typography mt={2} variant="subtitle1">
            Priority
          </Typography>
          {priorities.map((priority, index) => (
            <CheckboxControl
              key={`${priority}-${index}`}
              label={priority.charAt(0).toUpperCase() + priority.slice(1)}
              value={priority}
              checked={selectedPriorities.includes(priority)}
              onChange={handlePriorityChange}
            />
          ))}
          <Typography variant="subtitle1" mt={2}>
            Status
          </Typography>
          {statuses.map((status, index) => (
            <CheckboxControl
              key={`${status}-${index}`}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              value={status}
              checked={selectedStatuses.includes(status)}
              onChange={handleStatusChange}
            />
          ))}
          <Typography variant="subtitle1" mt={2}>
            Sort By
          </Typography>
          <Dropdown
            value={sortBy || ""}
            onChange={(value) => setSortBy(value as "priority" | "status")}
            listItems={["", "priority", "status"]}
          />
        </Grid>
        <Grid size={{ sm: 12, md: 8 }}>
          {filteredAndSortedTasks.map((task) => (
            <Box
              key={task.id}
              border={1}
              borderColor="white"
              mb={1}
              p={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6">{task.title}</Typography>
                <Typography sx={{ textTransform: "capitalize" }}>
                  Priority: {task.priority} | Status: {task.status}
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => handleTaskClick(task)}
                  variant={"contained"}
                  color={"info"}
                  sx={{ marginRight: 1 }}
                >
                  Open
                </Button>
                <Button
                  onClick={() => handleDeleteTask(task)}
                  variant="contained"
                  color="warning"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
      <TaskPopup
        task={selectedTask}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </Box>
  );
};
