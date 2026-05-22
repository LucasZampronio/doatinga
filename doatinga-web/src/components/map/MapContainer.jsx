import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import Legend from './Legend';
import styles from './MapContainer.module.css';
import 'leaflet/dist/leaflet.css';

// Componente auxiliar para centralizar o mapa
const ChangeView = ({ center }) => {
  const map = useMap();
  if (center) {
    map.setView(center, 15, { animate: true });
  }
  return null;
};

const MapContainerComponent = ({ institutions, selectedInstitution }) => {
  const initialPosition = [-30.1579, -51.1418]; // Centro da Restinga
  const [mapCenter, setMapCenter] = useState(initialPosition);

  useEffect(() => {
    if (selectedInstitution && selectedInstitution.latitude && selectedInstitution.longitude) {
      setMapCenter([selectedInstitution.latitude, selectedInstitution.longitude]);
    }
  }, [selectedInstitution]);

  return (
    <div className={styles.mapWrapper}>
      <Legend />
      <MapContainer 
        center={initialPosition} 
        zoom={14} 
        className={styles.mapElement}
      >
        <ChangeView center={selectedInstitution ? [selectedInstitution.latitude, selectedInstitution.longitude] : null} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {institutions && institutions.map(inst => (
          <LocationMarker key={inst.id} institution={inst} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapContainerComponent;
