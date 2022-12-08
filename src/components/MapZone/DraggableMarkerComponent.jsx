import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, Marker, Popup } from 'react-leaflet';
import { iconLogo } from './Icon';
import { MyLocContext } from '../Forms/FormService';

// const DraggableMarkerComponent = ({ center }) => {
const DraggableMarkerComponent = () => {
  const [draggable, setDraggable] = useState(false);
  const { geoloc, setGeoloc } = useContext(MyLocContext);

  //   const [position, setPosition] = useState([geoloc.coordinates.latitude, geoloc.coordinates.longitude]);
  const markerRef = useRef(null);
  console.log(geoloc);
  //   useEffect(() => {
  //     console.log('position moved & geoloc context updated');
  //     if (position[0] && position[1]) {
  //       setGeoloc((currentloc) => {
  //         return {
  //           ...currentloc,
  //           coordinates: {
  //             latitude: position[0],
  //             longitude: position[1],
  //           },
  //         };
  //       });
  //     }
  //     console.log(geoloc);
  //     return () => {};
  //   }, [position]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        // console.log('markref', markerRef, marker);
        if (marker != null) {
          // console.log('getLatLng', marker.getLatLng());
          const { lat, lng } = marker.getLatLng();
          setGeoloc((currentloc) => {
            return {
              ...currentloc,
              coordinates: {
                latitude: lat,
                longitude: lng,
              },
            };
          });
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const fillYellowOptions = { fillColor: '#FFB703' };
  return (
    <Marker
      icon={iconLogo}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={[geoloc.coordinates.latitude, geoloc.coordinates.longitude]}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Component : Place the Marker to match your service zone And click'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
      <Circle
        center={[geoloc.coordinates.latitude, geoloc.coordinates.longitude]}
        pathOptions={fillYellowOptions}
        radius={200}
      />
    </Marker>
  );
};

export default DraggableMarkerComponent;
