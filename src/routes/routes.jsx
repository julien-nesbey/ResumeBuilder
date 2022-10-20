//Pages
import Home from "../pages/Home";
import Build from "../pages/Build";
import Template from "../pages/Template";

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
    path: "/preview",
    element: <Template />,
  },
];

export default routes;
