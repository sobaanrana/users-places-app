import React from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const PlaceItem = (props) => {
  return (
    <li>
      <Card className="flex flex-col items-center justify-center w-100 h-100 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <img
          src={props.image}
          alt={props.title}
          className="w-80 h-40 object-cover rounded-t-lg"
        />
        <div className="flex flex-col items-start justify-between w-full p-4">
          <h2 className="text-xl font-bold">{props.title}</h2>
          <h3 className="text-gray-500">{props.address}</h3>

          <p className="text-gray-600">{props.description}</p>
        </div>

        <div className="flex justify-between w-full p-4">
          <Button className="bg-green-500">View</Button>
          <Button className="bg-blue-500" to={`/places/${props.id}`}>
            Edit
          </Button>
          <Button className="bg-red-500 ">Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
