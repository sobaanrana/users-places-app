import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpCleint } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, SendRequest, clearError } = useHttpCleint();

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await SendRequest(
        `http://localhost:4000/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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
        <div className="h-96 w-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.631924061905!2d-4.327853623119764!3d55.78226428972142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888474845a6449d%3A0x2242df9b51c1df28!2sHeat%20It%20up%20Ltd!5e0!3m2!1sen!2suk!4v1744827052162!5m2!1sen!2suk"
            width="350"
            height="250"
            //   style="border:0;"
            allowFullScreen
            loading="lazy"
          />
        </div>

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

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footer={
          <>
            <Button className="bg-red-500" onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button className="bg-green-500" onClick={props.onDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>

      <li>
        <Card className="flex flex-col items-center justify-center w-100 h-100 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          {isLoading && <LoadingSpinner asOverlay />}
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
            {auth.userId === props.creatorID && (
              <Button className="bg-blue-500" to={`/places/${props.id}`}>
                Edit
              </Button>
            )}
            {auth.userId === props.creatorID && (
              <Button className="bg-red-500 " onClick={confirmDeleteHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
