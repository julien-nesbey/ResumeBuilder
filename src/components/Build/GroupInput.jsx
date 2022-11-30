import { Input, InputGroup, Textarea } from "react-daisyui";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export const GroupInputText = (props) => {
  const { title, error, field, type = "text", value, ...other } = props;
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
          {...other}
        />
      </div>
      <ErrorMessage message={error?.message} />
    </InputGroup>
  );
};

export const GroupInputFile = (props) => {
  const { title, error, field, accept, ...other } = props;
  const { register } = useFormContext();
  return (
    <InputGroup className="flex flex-col">
      <div className="flex flex-row">
        <span>
          <label htmlFor="profilePicture" className="label-text">
            {title}
          </label>
        </span>
        <Input
          type={"file"}
          id="profilePicture"
          accept={accept}
          className={`w-2/4 ${error && "border-error"}`}
          {...register(field)}
          {...other}
        />
      </div>
      <ErrorMessage message={error?.message} />
    </InputGroup>
  );
};

export const GroupInputRadio = (props) => {
  const { title, field, value, error, ...other } = props;
  const { register } = useFormContext();
  return (
    <div className="flex flex-col w-2/4 justify-center items-center">
      <Input
        type={"radio"}
        value={value}
        className="w-3/12 accent-black outline-hidden"
        {...register(field)}
        {...other}
      />
      <small className={`text-lg font-semibold ${error && "text-error"}`}>
        {title}
      </small>
    </div>
  );
};

export const GroupInputTextArea = (props) => {
  const { title, error, field, rows, cols, placeholder = "", ...other } = props;
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
          className={`${error && "border-error"} h-auto`}
          {...register(field)}
          {...other}
        ></Textarea>
      </div>
      <ErrorMessage message={error?.message} />
    </InputGroup>
  );
};

export const GroupInputSelect = (props) => {
  const { title, error, field, children, ...other } = props;
  const { register } = useFormContext();
  return (
    <InputGroup className="flex flex-col">
      <div className="flex flex-row">
        <span className="label-text">{title}</span>
        <select
          className={`select w-2/4 ${error && "border-error"}`}
          {...register(field)}
          {...other}
        >
          <option value="">Please choose an option</option>
          {children}
        </select>
      </div>
      {error != undefined && <ErrorMessage message={error?.message} />}
    </InputGroup>
  );
};
