import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

// IMPORTAÇÃO DO HEADER E FOOTER
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

import './Catalogo.css';

export default function Catalogo() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Carregar dados do catálogo
  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/donations");

        setItens(response.data.data);
      } catch (error) {
        setErro('Erro ao carregar itens do catálogo.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  // Filtragem dos itens
  const filtrados = useMemo(() => {
    return itens.filter((item) =>
      item.name.toLowerCase().includes(busca.toLowerCase())
    );
  }, [itens, busca]);

  return (
    <>
      {/* HEADER GLOBAL */}
      <Header />

      <main className="catalogo">
        <div className="catalogo__topo">
          <h1>Catálogo</h1>

          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar item..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Mensagens de carregamento ou erro */}
        {loading && <p>Carregando itens...</p>}
        {erro && <p className="erro">{erro}</p>}

        {/* Grid de cards */}
        <div className="catalogo__grid">
          {filtrados.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* FOOTER GLOBAL */}
      <Footer />
    </>
  );
}
