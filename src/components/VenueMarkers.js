import React, { useContext } from "react";
import data from "../assets/data.json";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import { AppContext } from "../Context/AppContext";

const VenueMarkers = () => {
  const {sitiosCercanos} = useContext(AppContext);
  const sitios = data.venues;
  console.log(sitiosCercanos)
  const markers = sitios.map((venue, i) => (
    <Marker key={venue.name} position={venue.geometry} icon={VenueLocationIcon}>
    <MarkerPopup data={venue} />
    </Marker>
  ));
  
  return <>{markers}</>;
};

export default VenueMarkers;
