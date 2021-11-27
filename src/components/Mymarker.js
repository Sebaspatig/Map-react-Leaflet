import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Marker, Popup } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";


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

    useEffect(()=>{
        console.log(position)
    },[position])

  

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    
    return (
        <>
        {sites.geometry !== undefined?

            <Marker key={sites.name} icon={VenueLocationIcon} 
                draggable={draggable}
                ondragend={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                    ? 'Marker is draggable'
                    : 'Click here to make marker draggable'}
                </span>
                </Popup>
            </Marker>

        : null
        }
        </>
    )
        
}
