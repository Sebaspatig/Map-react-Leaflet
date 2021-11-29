import React, { useEffect, useState } from 'react';
import data from "../assets/data.json";

export const AppContext = React.createContext();

const RADIO= 6372.795477598

const AppProvider = (props) => {
    const Sitios = data.venues;

    const [myposition, setMyPosition] = useState({
        lat: 0,
        lng: 0,
      });
    
    const [sitiosCercanos,setSitiosCercanos] = useState()

    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
            setMyPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            },
            function (error) {
            console.error("Error Code = " + error.code + " - " + error.message);
            },
            {
            enableHighAccuracy: true,
            }
        );

        const calculoDist = (lat1, lng1, latlng2,sitios) =>{
            const sitioCercano= []
            console.log(lat1)
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
        
          const latlng2= Sitios.map(sitio =>({
            name: sitio.name,
            lat2: sitio.geometry?.[0],
            lng2: sitio.geometry?.[1]
          }
          ))
          
            let lat1= myposition.lat
            let lng1=  myposition.lng
            calculoDist(lat1,lng1,latlng2,data.venues)

    }, []);


    return (
        <AppContext.Provider
			value={{
                myposition, setMyPosition, sitiosCercanos
				
			}}>
			{props.children}
		</AppContext.Provider>
    );
}

export { AppProvider };
