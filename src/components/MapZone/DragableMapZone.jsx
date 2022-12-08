import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DraggableMarkerComponent from './DraggableMarkerComponent';
import './MapZone.css';
import { MyLocContext } from '../Forms/FormService';

const DragableMapZone = () => {
  const { geoloc } = useContext(MyLocContext);
  // set example :
  // setGeoloc(curLoc => {
  //   return {...curLoc,
  //   // permission: 'denied',
  //   coordinates: {
  //     latitude: 48.85356416664298,
  //     longitude: 2.348096586347212,
  //   },
  // }});

  // const center = { // London exemple
  //   lat: 51.505,
  //   lng: -0.09,
  // };

  // function DraggableMarker() {
  //   const [draggable, setDraggable] = useState(false);
  //   const [position, setPosition] = useState(center);
  //   const markerRef = useRef(null);
  //   const eventHandlers = useMemo(
  //     () => ({
  //       dragend() {
  //         const marker = markerRef.current;
  //         if (marker != null) {
  //           setPosition(marker.getLatLng());
  //         }
  //       },
  //     }),
  //     [],
  //   );
  //   const toggleDraggable = useCallback(() => {
  //     setDraggable((d) => !d);
  //   }, []);
  //   return (
  //     <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
  //       <Popup minWidth={90}>
  //         <span onClick={toggleDraggable}>
  //           {draggable
  //             ? 'Place the Marker to match your service zone And click'
  //             : 'Click here to make marker draggable'}
  //         </span>
  //       </Popup>
  //     </Marker>
  //   );
  // }
  console.log('in DragMapZoneComponent : ', geoloc.coordinates);

  return (
    <div className="MapZone">
      {geoloc.coordinates.latitude && geoloc.coordinates.longitude && (
        <MapContainer
          style={{ height: '100%' }}
          center={[geoloc.coordinates.latitude, geoloc.coordinates.longitude]}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[coordinate.latitude, coordinate.longitude]}>
          <Popup>
            <img src="https://toppng.com/uploads/preview/lightning-bolt-11549723188q9jgshmchb.png" alt="" />
            Dragable ?.
          </Popup>
        </Marker> */}
          <DraggableMarkerComponent />
        </MapContainer>
      )}
    </div>
  );
};

export default DragableMapZone;
