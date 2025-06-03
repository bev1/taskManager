import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import {HomePage} from "./pages/homePage";
import {ProjectPage} from "./pages/projectPage";
import {NotFound} from "./pages/notFound";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  )
}

export default App
