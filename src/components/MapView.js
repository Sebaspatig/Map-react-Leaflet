import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import { useLocation, useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Mymarker from "./Mymarker";

const RADIO= 6372.795477598


const MapView = () => {
  const [sitiosCercanos,setSitiosCercanos] = useState()
  

  const [state, setState] = useState({
    currentLocation: { lat: 6.210069116973207, lng: -75.57932598545374 },
    zoom: 13,
    Myposition:{site:{}},
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
        Myposition: {
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

    const calculoDist = (lat1, lng1, latlng2,sitios) =>{
      const sitioCercano= []
      for(let i = 0; i<latlng2.length; i= i+1){
        let lat2= latlng2[i].lat2
        let lng2= latlng2[i].lng2
        let deltalat=lat2-lat1
        let deltalon=lng2-lng1
        let X=(Math.sin(deltalat/2))**2
        let W=(Math.sin(deltalon/2))**2
        let Y=Math.cos(lat1)*Math.cos(lat2)*W
        let dist= (2*RADIO*Math.asin(Math.sqrt(X+Y)))*10
        if(dist<4500){
          const sitiocercano = sitios.filter(
            (sitio) => sitio['name'] === latlng2[i].name
          );
          sitioCercano.push(sitiocercano[0])
          setSitiosCercanos(sitioCercano)
        }
      }
    }
  
    const Sitios = sites.data.venues;
    const latlng2= Sitios.map(sitio =>({
      name: sitio.name,
      lat2: sitio.geometry?.[0],
      lng2: sitio.geometry?.[1]
    }
    ))
    
      let lat1= state.Myposition.site?.geometry?.[0]
      let lng1= state.Myposition.site?.geometry?.[1]
      calculoDist(lat1,lng1,latlng2,sites.data.venues)

  }, [location]);


  

  return (
    <Map center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Mymarker sites={state.Myposition.site}/>

      <Markers venues={sitiosCercanos?sitiosCercanos:sites.data.venues} />
      
    </Map>
  );
};

export default MapView;
