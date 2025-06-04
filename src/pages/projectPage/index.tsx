import type { FC } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Status } from "../../store/types.ts";
import { TasksList } from "../../components/tasksList";

export const ProjectPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  console.log("projectId", projectId);
  const { projects, error, status } = useSelector((state: RootState) => ({
    projects: state.projects.projects,
    error: state.projects.error,
    status: state.projects.status,
  }));
  const projectToRender = projects.find((p) => p.id === projectId);

  if (status === Status.Loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!projectToRender || error) {
    return (
      <Box>
        <Typography color="error">Error: {error || "Project not found!"}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">{projectToRender.name}</Typography>
      <Typography variant="subtitle1">
        Due Date: {new Date(projectToRender.dueDate).toLocaleDateString()}
      </Typography>
      <Typography>Tasks count: {projectToRender.tasks.length}</Typography>
      <Box mt={2}>
        <TasksList tasks={projectToRender.tasks} />
      </Box>
    </Box>
  );
};
