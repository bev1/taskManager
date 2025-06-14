import { type FC } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

import type { Project } from "../../types/general.types.ts";

export const ProjectTile: FC<Project> = (project) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>
        <Typography>
          Due Date: {new Date(project.dueDate).toLocaleDateString()}
        </Typography>
        <Button
          component={RouterLink}
          to={`/projects/${project.id}`}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10 }}
          role="button"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
