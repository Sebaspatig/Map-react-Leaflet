import React, { useContext, useRef, useState } from 'react'
import { Marker, Popup } from "react-leaflet";
import { AppContext } from '../Context/AppContext';
import { MymarkerIcon } from "./VenueLocationIcon";



export default function Mymarker() {
    const {myposition, setMyPosition, Sitios, setSitiosCercanos} = useContext(AppContext);
    const [position, setPosition] = useState(myposition)
    const markerRef = useRef(null)

    const eventHandlers = () => {
        const marker = markerRef.current.leafletElement._latlng
        if (marker != null) {
          setPosition(marker)
          setMyPosition(marker)
          setSitiosCercanos(Sitios)
        } 
    }
    
    return (
        <>
        {myposition !== undefined?

            <Marker key="Mi Posicion" icon={MymarkerIcon} 
                draggable={true}
                ondragend={eventHandlers}
                position={myposition}
                ref={markerRef}
                >
                <Popup minWidth={90}>
                <span >
                 Esta es tu posición aproximada
                </span>
                </Popup>
            </Marker>

        : null
        }
        </>
    )
        
}
