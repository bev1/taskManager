import { type FC } from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { routes } from "../../constants/routes.ts";
import AddTaskIcon from "@mui/icons-material/AddTask";

export const Layout: FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={routes.HOME}
            style={{
              textDecoration: "none",
              color: "white",
              flexGrow: 1,
            }}
          >
            <AddTaskIcon />
            Task Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: "20px" }}>
        <Outlet />
      </Container>
    </Box>
  );
};
