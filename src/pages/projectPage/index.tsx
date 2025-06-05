import type { FC } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

import { TasksList } from "../../components/tasksList";
import type { RootState } from "../../store";

export const ProjectPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, error } = useSelector((state: RootState) => ({
    projects: state.projects.projects,
    error: state.projects.error,
    status: state.projects.status,
  }));
  const projectToRender = projects.find((p) => p.id === projectId);

  if (!projectToRender || error) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Box>
      <Typography variant="h4">{projectToRender.name}</Typography>
      <Typography variant="subtitle1">
        Due Date: {new Date(projectToRender.dueDate).toLocaleDateString()}
      </Typography>
      <Typography>Tasks count: {projectToRender.tasks.length}</Typography>
      <Divider color={"white"} />
      <Box mt={4}>
        <TasksList tasks={projectToRender.tasks} />
      </Box>
    </Box>
  );
};
