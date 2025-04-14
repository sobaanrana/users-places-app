import React from "react";

const MainHeader = (props) => {
  return (
    <header className="h-[40px] bg-gray-400 p-2 gap-4">{props.children}</header>
  );
};

export default MainHeader;
