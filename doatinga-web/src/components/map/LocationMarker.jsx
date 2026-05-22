import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ícone customizado laranja igual ao design
const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const LocationMarker = ({ institution }) => {
  if (!institution.latitude || !institution.longitude) return null;

  const position = [parseFloat(institution.latitude), parseFloat(institution.longitude)];

  return (
    <Marker position={position} icon={orangeIcon}>
      <Popup>
        <div style={{ padding: '5px' }}>
          <h4 style={{ margin: '0 0 5px', color: '#406db0' }}>{institution.name}</h4>
          <p style={{ margin: '0 0 10px', fontSize: '0.85rem' }}>{institution.street}, {institution.number}</p>
          <a 
            href={`/instituicao/${institution.id}`}
            style={{ 
                color: 'white', 
                backgroundColor: '#f3922b', 
                padding: '5px 10px', 
                borderRadius: '4px', 
                textDecoration: 'none',
                fontSize: '0.8rem'
            }}
          >
            Ver Detalhes
          </a>
        </div>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
