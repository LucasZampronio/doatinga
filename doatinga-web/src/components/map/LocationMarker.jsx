import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const LocationMarker = ({ institution }) => {
  const position = [institution.latitude, institution.longitude];

  return (
    <Marker position={position}>
      <Popup>
        <div>
          <h4>{institution.name}</h4>
          <p>{institution.address}</p>
          <a href={`/instituicao/${institution.id}`}>Ver detalhes</a>
        </div>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;