import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  if (props?.to) {
    return (
      <Link
        className={`${props?.className}  text-white px-4 py-2 rounded-lg`}
        to={props.to}
        exact={props.exact}
      >
        {props?.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props?.className}  text-white px-4 py-2 rounded-lg`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props?.children}
    </button>
  );
};

export default Button;

// Can also handle href and link buttons here
