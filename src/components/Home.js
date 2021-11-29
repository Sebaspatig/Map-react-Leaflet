import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import MapView from "./MapView";

const Home = () => {
  const {myposition} = useContext(AppContext);

  return (
    <div>
      <h1>My Geolocation</h1>
      <p>Latitude: {myposition.lat}</p>
      <p>longitude: {myposition.lng}</p>

      <MapView/>
    </div>
  );
};

export default Home;
