import React, { use, useEffect, useReducer } from "react";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        // isValid: true
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  }); // useReducer is used when the state is complex and has multiple values.
  // useState is used when the state is simple and has only one value.

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // useEffect is used to perform side effects in functional components.
  const onChanhedHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChanhedHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className="border border-gray-300 rounded-md p-2"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={onChanhedHandler}
        onBlur={touchHandler}
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

      {!inputState.isValid && inputState.isTouched && (
        <p>{props?.errorText} </p>
      )}
    </div>
  );
};

export default Input;
