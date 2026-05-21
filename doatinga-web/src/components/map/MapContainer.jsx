import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import styles from './MapContainer.module.css';
import 'leaflet/dist/leaflet.css';

const MapContainerComponent = ({ institutions }) => {
  // Posição inicial do mapa (centro da Restinga)
  const initialPosition = [-30.1579, -51.1418];
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (institutions && institutions.length > 0) {
      const newMarkers = institutions.map(inst => (
        <LocationMarker key={inst.id} institution={inst} />
      ));
      setMarkers(newMarkers);
    }
  }, [institutions]);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer 
        center={initialPosition} 
        zoom={15} 
        className={styles.mapElement}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers}
      </MapContainer>
    </div>
  );
};

export default MapContainerComponent;