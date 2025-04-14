import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <li>
      <Card className="bg-stone-300 w-[200px] p-4 rounded-2xl">
        <Link to={`/${props.id}/places`}>
          <Avatar image={props.image} alt={props.name} />
          <h2 className="font-semibold">{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount > 0 ? "places" : "place"}
          </h3>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
