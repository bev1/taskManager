import { type FC, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { Task } from "../../types/general.types.ts";
import TaskPopup from "../taskPopup";

export const TasksList: FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
    setIsPopupOpen(false);
  };

  return (
    <Box>
      {tasks.map((task) => (
        <Box
          key={task.id}
          border={1}
          borderColor="white"
          mb={1}
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "grey" },
          }}
          onClick={() => handleTaskClick(task)}
        >
          <Typography variant="h6">{task.title}</Typography>
          <Typography>
            Priority: {task.priority} | Status: {task.status}
          </Typography>
        </Box>
      ))}
      <TaskPopup
        task={selectedTask}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </Box>
  );
};
