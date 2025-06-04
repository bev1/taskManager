import { type FC, useCallback } from "react";
import { Box, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { routes } from "../../constants/routes.ts";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useTheme } from "@mui/material/styles";
import { generateProjects } from "../../store/projectSlice.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";

export const Layout: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const handleProjectsGenerationClick = useCallback(() => {
    dispatch(generateProjects());
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component={Link}
              to={routes.HOME}
              sx={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddTaskIcon
                sx={{
                  marginRight: theme.spacing(1),
                }}
              />
              Logo
            </Typography>
            <Button
              onClick={handleProjectsGenerationClick}
              variant={"contained"}
              color={"success"}
            >
              Generate random projects
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: theme.spacing(2) }}>
        <Outlet />
      </Container>
    </Box>
  );
};
