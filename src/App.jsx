//Routes
import routes from "./routes/routes";

//React Router
import { useRoutes } from "react-router-dom";

//Context
import { ValuesContextProvider } from "./context/ValuesContext";

const App = () => {
  const content = useRoutes(routes);
  return <ValuesContextProvider>{content}</ValuesContextProvider>;
};

export default App;
