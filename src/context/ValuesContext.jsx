import { useContext, createContext } from "react";
import { useSessionStorage } from "../utilities/useSessionStorage";

const ValuesContext = createContext({});

export const useValuesContext = () => {
  return useContext(ValuesContext);
};

export const ValuesContextProvider = ({ children }) => {
  const [values, setValues] = useSessionStorage("resumeBuilderValues", {});

  const getValues = () => {
    return values;
  };

  const addValues = (val) => {
    setValues(val);
  };

  return (
    <ValuesContext.Provider value={{ getValues, addValues }}>
      {children}
    </ValuesContext.Provider>
  );
};
