import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { ProjectPage } from "./pages/projectPage";
import { NotFound } from "./pages/notFound";
import { Layout } from "./components/layout";
import { routes } from "./constants/routes.ts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.PROJECTS} element={<ProjectPage />} />
          <Route path={routes.NOT_FOUND} element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
