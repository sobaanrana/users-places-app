import React from "react";
import Input from "../../shared/components/FormElements/Input";

const NewPlace = () => {
  return (
    <div>
      <form>
        <Input
          element="input"
          type="text"
          label="Tile"
          validators={[]}
          errorText="Please enter a valid title!"
        />
      </form>
    </div>
  );
};

export default NewPlace;
