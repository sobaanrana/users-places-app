import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
      onClick={props?.onClick}
    ></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
