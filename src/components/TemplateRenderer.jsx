//Context
import { useIdContext } from "../context/IdContext";

//Routes
import { useParams, Navigate } from "react-router-dom";

//API
import { templatesApi } from "../api/templatesApi";

const TemplateRenderer = () => {
  const { id, temp } = useParams();
  const { getId } = useIdContext();

  let validTemplates = [];
  let tempToRender = undefined;

  if (id != getId()) {
    return <Navigate to="/404" />;
  }

  templatesApi.map((t) => {
    validTemplates.push({
      id: t.id,
      template: t.template,
    });
  });

  validTemplates.map((v) => {
    if (v.id == temp) {
      tempToRender = v.template;
    }
  });

  return typeof tempToRender == "undefined" ? (
    <Navigate to="/404" />
  ) : (
    tempToRender
  );
};

export default TemplateRenderer;
