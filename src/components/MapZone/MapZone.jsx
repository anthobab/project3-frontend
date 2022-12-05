import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { iconLogo } from './Icon';
import './MapZone.css';

const MapZone = ({ coordinate }) => {
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
        <Marker icon={iconLogo} position={[coordinate.latitude, coordinate.longitude]}>
          <Popup>
            <img
              src="https://png.pngtree.com/png-clipart/20210507/ourmid/pngtree-abstract-white-light-sparkle-cross-special-effects-png-image_3245301.jpg"
              alt=""
            />
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapZone;
