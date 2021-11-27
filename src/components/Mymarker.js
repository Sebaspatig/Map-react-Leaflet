import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Marker, Popup } from "react-leaflet";
import { MymarkerIcon } from "./VenueLocationIcon";


export default function Mymarker(props) {
    const { sites } = props;
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(sites.geometry)
    const markerRef = useRef(null)

    const eventHandlers = () => {
        const marker = markerRef.current.leafletElement._latlng
        if (marker != null) {
          setPosition(marker) 
        } 
    }

    // useEffect(()=>{
    //     console.log(position)
    // },[position])

  

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    
    return (
        <>
        {sites.geometry !== undefined?

            <Marker key={sites.name} icon={MymarkerIcon} 
                draggable={draggable}
                ondragend={eventHandlers}
                position={position}
                ref={markerRef}
                onClick={toggleDraggable}>
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
