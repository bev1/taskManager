import { type FC } from "react";

import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { routes } from "../../constants/routes.ts";
import type { AppDispatch, RootState } from "../../store";
import { generateProjects } from "../../store/projectSlice.ts";
import { Status } from "../../store/types.ts";

export const Layout: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.projects);

  const handleProjectsGenerationClick = () => {
    dispatch(generateProjects());
  };

  if (status === Status.Loading) {
  }

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
      <Backdrop
        open={status === Status.Loading}
        sx={{
          color: "#fff",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
