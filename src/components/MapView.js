import React, { useState, useContext } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./VenueMarkers";
import "leaflet/dist/leaflet.css";
import Mymarker from "./Mymarker";
import { AppContext } from "../Context/AppContext";


const MapView = () => {
  const {myposition}= useContext(AppContext);
  

  const [state, setState] = useState({
    currentLocation: { lat: 6.210069116973207, lng: -75.57932598545374 },
    zoom: 12,
    Myposition:{site:{}},
  });

  return (
    <Map center={myposition} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Mymarker />

      <Markers />
      
    </Map>
  );
};

export default MapView;
