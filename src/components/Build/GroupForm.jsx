import React from "react";

export const GroupFormPersonalInfo = ({ children }) => {
  return (
    <>
      <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
        {children}
      </div>
    </>
  );
};
