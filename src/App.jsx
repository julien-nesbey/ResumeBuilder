//Routes
import routes from "./routes/routes";

//React Router
import { useRoutes } from "react-router-dom";

//Context
import { ValuesContextProvider } from "./context/ValuesContext";
import { IdContextProvider } from "./context/IdContext";

const App = () => {
  const content = useRoutes(routes);
  return (
    <ValuesContextProvider>
      <IdContextProvider>{content}</IdContextProvider>
    </ValuesContextProvider>
  );
};

export default App;
