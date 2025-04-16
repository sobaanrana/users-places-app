import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        footer={
          <Button className="bg-blue-500" onClick={closeMapHandler}>
            Close
          </Button>
        }
      >
        {/* <div className="h-96 w-96"> */}
        {/* <Map center={props.coordinates} zoom={16} /> */}
        {/* </div> */}

        {/* <div className="h-96 w-96">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?q=${props.coordinates.lat},${props.coordinates.lng}&key=YOUR_API_KEY`}
            width="100%"
            height="100%"
            allowFullScreen
          ></iframe>
        </div> */}
      </Modal>

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
            <Button className="bg-green-500" onClick={openMapHandler}>
              View
            </Button>
            <Button className="bg-blue-500" to={`/places/${props.id}`}>
              Edit
            </Button>
            <Button className="bg-red-500 ">Delete</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
