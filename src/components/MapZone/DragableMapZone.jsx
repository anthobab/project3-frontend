import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import './MapZone.css';

const MapZone = ({ coordinate }) => {
  const center = {
    lat: 51.505,
    lng: -0.09,
  };

  function DraggableMarker() {
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
    return (
      <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Place the Marker to match your service zone And click'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="MapZone">
      <MapContainer
        style={{ height: '100%' }}
        center={[coordinate.latitude, coordinate.longitude]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinate.latitude, coordinate.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <DraggableMarker />
      </MapContainer>
    </div>
  );
};

export default MapZone;
