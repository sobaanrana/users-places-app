import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      {/* MainNavigation is a component that contains the navigation bar */}
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />

        {/* <Redirect to="/" /> */}
        <Route path="*" element={<Navigate to="/" />} />
        {/* Redirects any undefined route to home */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
