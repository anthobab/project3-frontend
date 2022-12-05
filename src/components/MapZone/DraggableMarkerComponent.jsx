import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Circle, Marker, Popup } from 'react-leaflet';
import { iconLogo } from './Icon';

const DraggableMarkerComponent = ({ center }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
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
    <Marker icon={iconLogo} draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? 'Place the Marker to match your service zone And click' : 'Click here to make marker draggable'}
        </span>
      </Popup>
      <Circle center={position} pathOptions={fillYellowOptions} radius={200} />
    </Marker>
  );
};

export default DraggableMarkerComponent;
