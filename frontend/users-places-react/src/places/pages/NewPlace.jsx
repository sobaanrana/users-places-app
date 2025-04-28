import React, { use, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpCleint } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewPlace = () => {
  const { isLoading, error, SendRequest, clearError } = useHttpCleint();

  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await SendRequest(
        "http://localhost:4000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // Redirect the user to the places page after adding a new place
      // history.push(`/${auth.userId}/places`);
      navigate(`/`);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <div>
        <form>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="Tile"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title!"
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)!"
            onInput={inputHandler}
          />

          <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address!"
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            className="bg-blue-700"
            onClick={formSubmitHandler}
          >
            ADD PLACE
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPlace;
