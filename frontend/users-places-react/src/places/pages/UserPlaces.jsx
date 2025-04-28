import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpCleint } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// Dummy data for demonstration

// const dummyData = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "A famous skyscraper in New York City.",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Empire_State_Building_%28cropped%29.jpg/640px-Empire_State_Building_%28cropped%29.jpg",
//     address: "20 W 34th St, New York, NY 10001, USA",
//     location: {
//       lat: 40.748817,
//       lng: -73.985428,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Eiffel Tower",
//     description: "An iconic symbol of Paris.",
//     imageUrl:
//       "https://lh3.googleusercontent.com/p/AF1QipPTxHG0_dJooayYKzCB004tccRM5MhxYp6KWa53=w408-h544-k-no",
//     address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
//     location: {
//       lat: 48.858844,
//       lng: 2.294351,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p3",
//     title: "Colosseum",
//     description: "An ancient amphitheater in Rome.",
//     imageUrl:
//       "https://lh3.googleusercontent.com/p/AF1QipO0jDqEA4d2y-H9bcfOJ3NgTPhpbdFNFdwB3eZu=w408-h306-k-no",
//     address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
//     location: {
//       lat: 41.890251,
//       lng: 12.492373,
//     },
//     creator: "u3",
//   },
//   // Add more places as needed
// ];
const UserPlaces = () => {
  const userId = useParams().userId;

  const [loadedPlaces, setLoadedPlaces] = React.useState(null);

  const { isLoading, error, SendRequest, clearError } = useHttpCleint();

  const deletePlace = (placeId) => {
    const updatedFilteredPlaces = loadedPlaces.filter(
      (place) => place.id !== placeId
    );

    setLoadedPlaces(updatedFilteredPlaces);
  };

  // Fetch places from the server
  const fetchPlaces = async () => {
    try {
      const responseData = await SendRequest(
        `http://localhost:4000/api/places/user/${userId}`,
        "GET"
      );

      console.log(responseData);
      setLoadedPlaces(responseData?.places);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Filter places based on the userId
    //const filteredPlaces = places.filter((place) => place.creator === userId);
    // setLoadedPlaces(filteredPlaces);
    fetchPlaces();
  }, [SendRequest]); // Fetch places when the component mounts and never again triggered when the component re-renders
  // so only renders when the component mounts

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => {
      return prevPlaces.filter((place) => place.id !== deletedPlaceId);
    });
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner />}
      {
        !isLoading && loadedPlaces && (
          <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
        ) // Pass an empty array to items prop
      }
    </>
  );
};

export default UserPlaces;
