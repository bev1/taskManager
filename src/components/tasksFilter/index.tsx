import { type FC } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TaskPriority, TaskStatus } from "../../types/general.types.ts";
import { CheckboxControl } from "../formControls/checkbox";
import { Dropdown } from "../formControls/dropdown";
import type { FiltersProps } from "./types.ts";

export const TasksFilter: FC<FiltersProps> = ({
  createTask,
  changePriorityFilter,
  changeStatusFilter,
  selectedPriorities,
  selectedStatuses,
  sortDropdownChange,
  sortBy,
}) => {
  const priorities = Object.values(TaskPriority);
  const statuses = Object.values(TaskStatus);

  return (
    <Box>
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
          onChange={() => changePriorityFilter(priority)}
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
          onChange={() => changeStatusFilter(status)}
        />
      ))}
      <Typography variant="subtitle1" mt={2}>
        Sort By
      </Typography>
      <Dropdown
        value={sortBy || ""}
        onChange={(value) => sortDropdownChange(value)}
        listItems={["", "priority", "status"]}
      />
      <Button
        onClick={createTask}
        variant="contained"
        color="success"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Create Task
      </Button>
    </Box>
  );
};
