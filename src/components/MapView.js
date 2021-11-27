import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import { useLocation, useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Mymarker from "./Mymarker";

const MapView = () => {

  const [state, setState] = useState({
    currentLocation: { lat: 6.210069116973207, lng: -75.57932598545374 },
    zoom: 13,
    sites:{site:{}},
  });
  
  const [sites, setSites] = useState({
    currentLocation: { lat: 6.210069116973207, lng: -75.57932598545374 },
    zoom: 13,
    data, 
  });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      setState({
        ...state,
        sites: {
          site: {
            name: "Mi posicion",
            geometry: [currentLocation.lat, currentLocation.lng],
          },
        },
        currentLocation,
      });
      history.replace({
        pathname: "/map",
        state: {},
      });
    }
  }, [location]);
  

  return (
    <Map center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Mymarker sites={state.sites.site}/>

      <Markers venues={sites.data.venues} />
      
    </Map>
  );
};

export default MapView;
