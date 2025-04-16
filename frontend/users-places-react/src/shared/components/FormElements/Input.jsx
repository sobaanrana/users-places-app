import React, { useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const onChanhedHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChanhedHandler}
        value={inputState.value}
        className="border border-gray-300 rounded-md p-2"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={onChanhedHandler}
        value={inputState.value}
        className="border border-gray-300 rounded-md p-2"
      />
    );
  return (
    <div>
      <label htmlFor={props.id} className="text-gray-700">
        {props.label}
      </label>
      {element}

      {!inputState.isValid && <p>{props?.errorText} </p>}
    </div>
  );
};

export default Input;
