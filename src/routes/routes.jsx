//React Router
import { Navigate } from "react-router-dom";

//Pages
import Home from "../pages/Home";
import Build from "../pages/Build";
import Template from "../pages/Template";
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
    path: "/preview/:id",
    element: <Template />,
  },
  { path: "*", element: <Navigate to="/404" /> },
  {
    path: "404",
    element: <NotFound />,
  },
];

export default routes;
