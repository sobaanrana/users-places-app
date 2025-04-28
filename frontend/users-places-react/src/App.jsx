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
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  // let routes;

  // if (isLoggedIn) {
  //   routes = (
  //     <Routes>
  // ...
  // </Routes>
  // else {
  // }

  console.log(userId);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
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
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
          {/* Redirects any undefined route to home */}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
