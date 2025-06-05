import { type FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import { ProjectTile } from "../../components/projectTile";
import type { RootState } from "../../store";

export const HomePage: FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);

  return (
    <>
      <Typography variant="h4" component={"h1"} gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {projects &&
          projects?.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <ProjectTile {...project} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
