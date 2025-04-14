import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

const UsersList = (props) => {
  if (props?.items?.length === 0) {
    return (
      <div className="text-center">
        <Card>No users found</Card>
      </div>
    );
  }
  return (
    <ul className="flex gap-4 m-10 flex-wrap justify-center items-center">
      {props?.items?.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
