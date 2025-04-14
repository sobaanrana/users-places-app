import React from "react";
// import ReactDOM from "react-dom";

const SideDrawer = (props) => {
  //   const content = (
  //     <aside className="sm:hidden bg-gray-400 z-10 absolute left-0 w-[260px] h-full p-4 flex justify-center items-center">
  //       {props?.children}
  //     </aside>
  //   );

  //   return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));

  // Portal used to render component outside the DOM hierarchy of the parent component

  return (
    <aside className="sm:hidden bg-gray-400 z-10 absolute left-0 w-[260px] h-full p-4 flex justify-center items-center">
      {props?.children}
    </aside>
  );
};

export default SideDrawer;
