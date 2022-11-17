//React Router
import { Navigate } from "react-router-dom";

//Component
import TemplateRenderer from "../components/TemplateRenderer";

//Pages
import Home from "../pages/Home";
import Build from "../pages/Build";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/build",
    element: <Build />,
  },
  {
    path: "/preview/:id/:temp",
    element: <TemplateRenderer />,
  },
  { path: "*", element: <Navigate to="/404" /> },
  {
    path: "404",
    element: <NotFound />,
  },
];

export default routes;
