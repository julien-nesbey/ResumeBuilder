//React
import { useContext, createContext } from "react";

//UUID
import { v4 } from "uuid";

//Session Storage
import { useSessionStorage } from "../utilities/useSessionStorage";

const IdContext = createContext("");

export const useIdContext = () => {
  return useContext(IdContext);
};

export const IdContextProvider = ({ children }) => {
  const [id, setId] = useSessionStorage("ResumeBuilderId", v4());

  const getId = () => {
    return id;
  };

  return <IdContext.Provider value={{ getId }}>{children}</IdContext.Provider>;
};
