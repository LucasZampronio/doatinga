import React from 'react';
import './ItemCard.css';

export default function ItemCard({ item }) {
  return (
    <div className="card">
      {/* Badge opcional */}
      {item.status && (
        <span
          className={`card__badge ${
            item.status === 'nova_doacao'
              ? 'card__badge--green'
              : 'card__badge--blue'
          }`}
        >
          {item.status === 'nova_doacao' ? 'Nova doação' : 'Recém-chegado'}
        </span>
      )}

      {/* Imagem placeholder */}
      <div className="card__img-area">
        <div className="card__placeholder">🏛️</div>
      </div>

      {/* Conteúdo principal */}
      <div className="card__info">
        <h3 className="card__title">{item.name}</h3>

        {/* Endereço completo */}
        <p className="card__addr">
          {item.adress}, Nº {item.number}
        </p>

        {/* Horários de funcionamento */}
        {item.openingDays?.length > 0 && (
          <div className="card__opening">
            <strong>Funcionamento:</strong>
            <ul>
              {item.openingDays.map((day) => (
                <li key={day.id}>
                  {day.weekday}: {day.openingHour} - {day.closingHour}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
