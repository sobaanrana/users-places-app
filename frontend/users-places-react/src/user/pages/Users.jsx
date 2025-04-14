import React from "react";
import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    image:
      "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
    places: 3,
  },
  {
    id: "u2",
    name: "Manuel Schmitt",
    image:
      "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
    places: 5,
  },
  {
    id: "u3",
    name: "Sophie Schneider",
    image:
      "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
    places: 1,
  },
  {
    id: "u4",
    name: "Maximilian Müller",
    image:
      "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=3038",
    places: 2,
  },
];
const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
