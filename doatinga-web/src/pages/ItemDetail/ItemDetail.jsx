import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import api from '../../services/api';
import './ItemDetail.css';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await api.get(`/donations/item/${id}`);
                setItem(response.data.data);
            } catch (err) {
                setError('Erro ao carregar detalhes do item.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItemDetails();
    }, [id]);

    if (loading) return <div className="loading-state"><p>Carregando...</p></div>;
    if (error || !item) return <div className="error-state"><p>{error || 'Item não encontrado.'}</p></div>;

    return (
        <div className="item-detail-page">
            <Header />
            
            <main className="item-detail-content">
                <div className="container">
                    <button className="btn-back-catalog" onClick={() => navigate(-1)}>
                        Voltar para o catálogo
                    </button>

                    <div className="item-grid">
                        {/* Imagem */}
                        <div className="item-image-section">
                            <div className="image-card">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} />
                                ) : (
                                    <div className="placeholder-big">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 21V12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 12L21 7" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 12L3 7" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detalhes */}
                        <div className="item-info-section">
                            <div className="badge-row">
                                {item.isNeeded && <span className="badge badge-needed">Precisa doação</span>}
                                {item.isAvailable && <span className="badge badge-available">Disponível</span>}
                            </div>
                            
                            <h1>{item.name}</h1>
                            <p className="description">{item.description}</p>

                            <div className="info-block">
                                <div className="info-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <h3>Localização</h3>
                                </div>
                                <p className="institution-name">{item.institutionName}</p>
                                <p className="address">
                                    {item.street}, {item.number} - {item.neighborhood}<br />
                                    {item.city}, {item.state}
                                </p>
                            </div>

                            <div className="info-block">
                                <div className="info-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="#406db0" strokeWidth="2"/>
                                        <path d="M12 6V12L16 14" stroke="#406db0" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <h3>Horário de Funcionamento</h3>
                                </div>
                                {item.openingDays && item.openingDays.length > 0 ? (
                                    <ul className="opening-list">
                                        {item.openingDays.map((day, idx) => (
                                            <li key={idx}>
                                                <strong>{day.openingDay}:</strong> {day.openingHours.substring(0,5)}h - {day.closingHours.substring(0,5)}h
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Horários não informados.</p>
                                )}
                            </div>

                            <div className="info-block requirements-block">
                                <div className="info-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12L11 14L15 8" stroke="#856404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#856404" strokeWidth="2"/>
                                    </svg>
                                    <h3>Requisitos</h3>
                                </div>
                                <p>{item.requirements || 'Nenhum requisito especial informado.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ItemDetail;
