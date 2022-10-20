import routes from "./routes/routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const content = useRoutes(routes);
  return content;
};

export default App;
