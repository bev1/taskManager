import { type FC, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneratedProjects } from "../../store/projectSlice.ts";
import type { AppDispatch, RootState } from "../../store";

export const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, status, error } = useSelector(
    (state: RootState) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchGeneratedProjects());
  }, [dispatch]);

  console.log("projects", projects);
  return (
    <>
      <Box>Home page</Box>
    </>
  );
};
