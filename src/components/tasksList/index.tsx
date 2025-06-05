import { type FC, useState } from "react";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../../store";
import { removeTaskFromProject } from "../../store/projectSlice.ts";
import {
  type Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/general.types.ts";
import TaskPopup from "../taskPopup";
import { Task as TaskComponent } from "../task";

import { getFilteredAndSortedTasks } from "./helpers.ts";
import { TasksFilter } from "../tasksFilter";

export const TasksList: FC<{ tasks: Task[] }> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"priority" | "status" | undefined>();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleTaskOpen = (task: Task) => {
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

  const handleDeleteTask = (taskId: string) => {
    dispatch(removeTaskFromProject({ projectId, taskId }));
  };

  const handleCreateTask = () => {
    setSelectedTask({
      title: "",
      description: "",
      type: TaskType.userStory,
      priority: TaskPriority.minor,
      status: TaskStatus.open,
    } as Task);
    setIsPopupOpen(true);
  };

  const filteredAndSortedTasks = getFilteredAndSortedTasks(tasks, {
    priorities: selectedPriorities,
    statuses: selectedStatuses,
    sortBy,
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, md: 4 }}>
          <TasksFilter
            createTask={handleCreateTask}
            changePriorityFilter={handlePriorityChange}
            changeStatusFilter={handleStatusChange}
            selectedPriorities={selectedPriorities}
            selectedStatuses={selectedStatuses}
            sortBy={sortBy}
            sortDropdownChange={(value) => setSortBy(value as "priority" | "status")}
          />
        </Grid>
        <Grid size={{ sm: 12, md: 8 }}>
          {filteredAndSortedTasks.map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              deleteTask={handleDeleteTask}
              openTask={handleTaskOpen}
            />
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
