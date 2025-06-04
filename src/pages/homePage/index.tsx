import { type FC } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import type { RootState } from "../../store";
import { ProjectTile } from "../../components/projectTile";

export const HomePage: FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);

  console.log("projects", projects);
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
