import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

export default function ItemCard({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };

  // O backend retorna imageUrl (camelCase de image_url)
  return (
    <div className="item-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="item-card__header">
        {item.isNeeded && <span className="item-card__badge badge--needed">Precisa doação</span>}
        {item.isAvailable && <span className="item-card__badge badge--available">Disponível</span>}
      </div>

      <div className="item-card__image-container">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="item-card__image" />
        ) : (
          <div className="item-card__image-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21V12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L21 7" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L3 7" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      <div className="item-card__content">
        <h3 className="item-card__title">{item.name}</h3>
        <p className="item-card__institution">{item.institutionName || 'Abrigo da sopa'}</p>
        
        <div className="item-card__footer">
          <svg className="item-card__location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#F3922B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#F3922B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="item-card__address">
            {item.street}, {item.number} - {item.neighborhood}
          </span>
        </div>
      </div>
    </div>
  );
}
