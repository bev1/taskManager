import type { FC } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" color="primary" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Button variant="contained" color="primary" component={RouterLink} to="/">
        HOME PAGE
      </Button>
    </Box>
  );
};
