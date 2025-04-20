import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import AUTH from "./user/pages/AUTH";
import Auth from "./user/pages/AUTH";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  // let routes;

  // if (isLoggedIn) {
  //   routes = (
  //     <Routes>
  // ...
  // </Routes>
  // else {
  // }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        {/* MainNavigation is a component that contains the navigation bar */}
        {/* {routes} */}
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/:userId/places" exact element={<UserPlaces />} />
          <Route path="/auth" exact element={<Auth />} />
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
          {/* Redirects any undefined route to home */}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
