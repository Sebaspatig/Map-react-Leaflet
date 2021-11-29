import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import MapView from "./MapView";

const Home = () => {
  const {myposition, calcularDist, Sitios, setSitiosCercanos} = useContext(AppContext);

  return (
    <div className="map">
      <div className="map__info">

      <h1>My Geolocation</h1>
      <p>Latitude: {myposition.lat}</p>
      <p>longitude: {myposition.lng}</p>
      </div>

      <div className="map__controls">
      <button className="filterBtn" onClick={()=>calcularDist(myposition)}>Filtrar Tus Sitios mas cercanos</button>
      <span className="filterBtn deleteFilter" onClick={()=>setSitiosCercanos(Sitios)}>Borrar Filtros</span>
      </div>
      
      <MapView/>

    </div>
  );
};

export default Home;
