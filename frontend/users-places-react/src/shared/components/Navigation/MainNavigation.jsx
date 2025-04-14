import React, { useState } from "react";

import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/BackDrop";

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <MainHeader>
      {/* <button>Icon</button> */}
      <div className="HAMBURGER-ICON space-y-2 lg:hidden" onClick={openDrawer}>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>

      <div className="hidden lg:flex justify-between">
        <div>
          <h1>
            <Link to="/">Your Places</Link>
          </h1>
        </div>

        <nav>
          <NavLinks />
        </nav>
      </div>

      {/* Backdrop component to close the drawer when clicked outside */}

      {isDrawerOpen && <Backdrop onClick={closeDrawer} />}
      {isDrawerOpen && (
        <SideDrawer>
          <NavLinks />
        </SideDrawer>
      )}
    </MainHeader>
  );
};

export default MainNavigation;
