import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

// IMPORTAÇÃO DO HEADER E FOOTER
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

import './Catalogo.css';

export default function Catalogo() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState('');
  const [neighborhood, setNeighborhood] = useState('Adicionar bairro');
  const [shift, setShift] = useState('Adicionar turno');
  const [isNeeded, setIsNeeded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const donationTypes = [
    { label: 'Brinquedos', value: 'Brinquedos' },
    { label: 'Caminha', value: 'Caminha' },
    { label: 'Roupas', value: 'Roupas' },
    { label: 'Móveis', value: 'Móveis' },
    { label: 'Itens Higiene', value: 'Itens Higiene' },
    { label: 'Ração', value: 'Ração' },
    { label: 'Utensílios Dom.', value: 'Utensílios Dom.' },
    { label: 'Água', value: 'Água' },
  ];

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Carregar dados do catálogo com filtros
  useEffect(() => {
    async function carregar() {
      setLoading(true);
      try {
        const params = {
          name: busca,
          neighborhood: neighborhood === 'Adicionar bairro' ? undefined : neighborhood,
          shift: shift === 'Adicionar turno' ? undefined : shift,
          isNeeded: isNeeded || undefined,
          isAvailable: isAvailable || undefined,
          type: selectedTypes.length > 0 ? selectedTypes : undefined,
        };

        const response = await api.get("/donations", { params });
        setItens(response.data.data);
      } catch (error) {
        setErro('Erro ao carregar itens do catálogo.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [busca, neighborhood, shift, isNeeded, isAvailable, selectedTypes]);

  return (
    <div className="catalogo-page">
      <Header />
      
      <div className="catalogo-banner">
        <div className="container">
          <p>Encontre o que você mais precisa,</p>
          <p>Ajude os locais com doações</p>
        </div>
      </div>

      <main className="catalogo-container">
        <aside className="catalogo-sidebar">
          <h2>Filtros</h2>
          
          <div className="filter-section">
            <h3>Localização</h3>
            <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}>
              <option>Adicionar bairro</option>
              <option>Restinga</option>
              <option>Lomba do Pinheiro</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Horários de retirada</h3>
            <select value={shift} onChange={(e) => setShift(e.target.value)}>
              <option>Adicionar turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Doar ou retirada</h3>
            <label>
              <input 
                type="checkbox" 
                checked={isAvailable} 
                onChange={(e) => setIsAvailable(e.target.checked)} 
              /> 
              Disponível para retirar
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={isNeeded} 
                onChange={(e) => setIsNeeded(e.target.checked)} 
              /> 
              Precisa de doação
            </label>
          </div>

          <div className="filter-section">
            <h3>Tipo de doação</h3>
            <div className="checkbox-grid">
              {donationTypes.map((type) => (
                <label key={type.value}>
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes(type.value)}
                    onChange={() => handleTypeChange(type.value)}
                  /> 
                  {type.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="catalogo-content">
          <div className="search-bar-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar itens por nome"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {loading && <p className="status-msg">Carregando itens...</p>}
          {!loading && itens.length === 0 && <p className="status-msg">Nenhum item encontrado com esses filtros.</p>}
          {erro && <p className="status-msg error">{erro}</p>}

          <div className="catalogo-grid">
            {itens.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
