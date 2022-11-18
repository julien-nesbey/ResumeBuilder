import caret from "../assets/caret-up-fill.svg";

export const TopArrow = (props) => {
  return (
    <div
      className="p-4 bg-white w-8 h-8"
      onClick={() => window.scrollTo(0, 0)}
      {...props}
    >
      <img className="self-center" src={caret} />
    </div>
  );
};
