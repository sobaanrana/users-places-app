import React, { use, useEffect } from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="flex justify-center items-center flex-col m-auto h-screen">
        <h2>No places found. Maybe create one?</h2>
        <Button
          to="/places/new"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Share Place
        </Button>
      </Card>
    );
  }

  return (
    <ul className="flex gap-4 m-10 flex-wrap justify-center items-center">
      {props?.items?.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            deletePlace={props.onDeleteItem}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
