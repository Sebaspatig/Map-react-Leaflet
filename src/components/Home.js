import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [state, setstate] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setstate({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div>
      <h1>Geolocation</h1>
      <p>Latitude: {state.latitude}</p>
      <p>longitude: {state.longitude}</p>

      <Link
        to={{
          pathname: "/map",
          state,
        }}
      >
        See marker
      </Link>
    </div>
  );
};

export default Home;
