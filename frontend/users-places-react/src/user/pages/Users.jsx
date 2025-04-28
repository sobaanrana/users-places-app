import React, { useEffect } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpCleint } from "../../shared/hooks/http-hook";

// const USERS = [
//   {
//     id: "u1",
//     name: "Max Schwarz",
//     image:
//       "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
//     places: 3,
//   },
//   {
//     id: "u2",
//     name: "Manuel Schmitt",
//     image:
//       "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
//     places: 5,
//   },
//   {
//     id: "u3",
//     name: "Sophie Schneider",
//     image:
//       "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
//     places: 1,
//   },
//   {
//     id: "u4",
//     name: "Maximilian Müller",
//     image:
//       "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
//     places: 2,
//   },
// ];

const Users = () => {
  const [loadedUsers, setLoadedUsers] = React.useState();
  const { isLoading, error, SendRequest, clearError } = useHttpCleint();

  const fetchUsers = async () => {
    try {
      const responseData = await SendRequest("http://localhost:4000/api/users");

      setLoadedUsers(responseData.users);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, [SendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
