import { Input, InputGroup, Textarea } from "react-daisyui";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export const GroupInputText = ({
  title,
  error,
  field,
  type = "text",
  value,
}) => {
  const { register } = useFormContext();
  let style;
  switch (type) {
    case "text":
    case "email":
    case "tel":
      style = "w-2/4";
      break;
    case "checkbox":
      style = "checkbox";
      break;
    case "radio":
      style = "w-3/12 accent-black outline-hidden";
      break;
  }
  return (
    <InputGroup className="flex flex-col">
      <div className="flex flex-row">
        <span className="label-text">{title}</span>
        <Input
          type={type}
          value={value}
          className={`${style} ${error && "border-error"}`}
          {...register(field)}
        />
      </div>
      <ErrorMessage message={error?.message} />
    </InputGroup>
  );
};

export const GroupInputRadio = ({ title, field, value, error }) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col w-2/4 justify-center items-center">
      <Input
        type={"radio"}
        value={value}
        {...register(field)}
        className="w-3/12 accent-black outline-hidden"
      />
      <small className={`text-lg font-semibold ${error && "text-error"}`}>
        {title}
      </small>
    </div>
  );
};

export const GroupInputTextArea = ({
  title,
  error,
  field,
  rows,
  cols,
  placeholder = "",
}) => {
  const { register } = useFormContext();
  return (
    <InputGroup className="flex flex-col">
      <div className="flex flex-row">
        <span className="label-text">{title}</span>
        <Textarea
          spellCheck={false}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          {...register(field)}
          className={`${error && "border-error"} h-auto`}
        ></Textarea>
      </div>
      <ErrorMessage message={error?.message} />
    </InputGroup>
  );
};

export const GroupInputSelect = ({ title, error, field, children }) => {
  const { register } = useFormContext();
  return (
    <InputGroup className="flex flex-col">
      <div className="flex flex-row">
        <span className="label-text">{title}</span>
        <select
          {...register(field)}
          className={`select w-2/4 ${error && "border-error"}`}
        >
          <option value="">Please choose an option</option>
          {children}
        </select>
      </div>
      {error != undefined && <ErrorMessage message={error?.message} />}
    </InputGroup>
  );
};
