import React from "react";

const Avatar = (props) => {
  return <img src={props.image} alt={props.alt} className="w-[100px]" />;
};

export default Avatar;
