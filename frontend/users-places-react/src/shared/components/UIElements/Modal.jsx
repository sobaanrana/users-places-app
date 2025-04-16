import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./BackDrop";

const ModelOverlay = (props) => {
  const content = (
    <div
      className={`fixed top-1/2 left-1/2 w-[250px] h-[250px] bg-gray-100 z-10 transform -translate-x-1/2 -translate-y-1/2 p-4 sm:w-[400px] sm:h-[400px] rounded-lg shadow-lg `}
    >
      <header className=" ">
        <h2 className="font-semibold">{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault
        }
      >
        <div className="text-center">{props.children}</div>
        <footer className="absolute bottom-2  right-2">
          {/* <button
            className="bg-gray-200 rounded-lg p-2 hover:bg-gray-300"
            onClick={props.onCancel}
          >
            {props.footerText}
          </button>
          <button
            className="bg-gray-200 rounded-lg p-2 hover:bg-gray-300"
            type="submit"
            onClick={props.onSubmit}
          >
            {props.submitText}
          </button> */}
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} {...props} />}
      {props.show && <ModelOverlay {...props} />}
    </>
  );
};

export default Modal;
