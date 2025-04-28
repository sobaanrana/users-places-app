import React, { useEffect, useReducer, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { useHttpCleint } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

// const places = [
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

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const { isLoading, error, SendRequest, clearError } = useHttpCleint();
  const [loadedPlace, setLoadedPlace] = React.useState(null);

  // Find the place with the given placeId
  // const identifiedPlace = places.find((place) => place.id === placeId);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await SendRequest(
          `http://localhost:4000/api/places/${placeId}`,
          "GET"
        );

        console.log("update place", responseData);
        setLoadedPlace(responseData?.place);

        setFormData(
          {
            title: {
              value: responseData?.place?.title,
              isValid: true,
            },
            description: {
              value: responseData?.place?.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlace();
  }, [SendRequest, placeId, setFormData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the place is not found, you can handle it accordingly - dummy fallback

  //   if (formState.inputs.title.value) {
  //     return <div>Loading...</div>;
  //   }

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    // setFormData(
    //   {
    //     title: {
    //       value: formState.inputs.title.value,
    //       isValid: true,
    //     },
    //     description: {
    //       value: formState.inputs.description.value,
    //       isValid: true,
    //     },
    //   },
    //   true
    // );

    try {
      await SendRequest(
        `http://localhost:4000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      navigate(`/${auth.userId}/places`);
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     setFormData(
  //       {
  //         title: {
  //           value: identifiedPlace.title,
  //           isValid: true,
  //         },
  //         description: {
  //           value: identifiedPlace.description,
  //           isValid: true,
  //         },
  //       },
  //       true
  //     );
  //   }, [identifiedPlace, setFormData]);

  if (!loadedPlace && !error) {
    return <div>Place not found!</div>;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            // initialValue={formState.inputs.title.value}
            // initialValid={formState.inputs.title.isValid}

            initialValue={loadedPlace?.title}
            initialValid={true}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            // initialValue={formState.inputs.description.value}
            // initialValid={formState.inputs.description.isValid}
            initialValue={loadedPlace?.description}
            initialValid={true}
          />

          <Button
            type="submit"
            disabled={!formState.isValid}
            className="bg-blue-700"
            onClick={placeUpdateSubmitHandler}
          >
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
