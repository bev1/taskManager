import { type FC } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import type { TaskProps } from "./types.ts";
import Grid from "@mui/material/Grid";

export const Task: FC<TaskProps> = ({ task, openTask, deleteTask }) => {
  return (
    <Grid
      container
      border={1}
      borderColor="white"
      mb={1}
      p={2}
      sx={{
        alignItems: "center",
      }}
    >
      <Grid size={9}>
        <Typography variant="h6">{task.title}</Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          Priority: {task.priority} | Status: {task.status}
        </Typography>
      </Grid>
      <Grid size={3}>
        <Button
          onClick={() => openTask(task)}
          variant={"contained"}
          color={"info"}
          sx={{ marginRight: 1 }}
        >
          Open
        </Button>
        <Button
          onClick={() => deleteTask(task.id)}
          variant="contained"
          color="warning"
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};
