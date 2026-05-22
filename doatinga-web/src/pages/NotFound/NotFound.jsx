import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <Header />
            <main className="not-found-content">
                <div className="not-found-container">
                    <div className="not-found-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" stroke="#406db0" strokeWidth="2"/>
                            <path d="M21 21L16.65 16.65" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="icon-badge">404</span>
                    </div>
                    <h1>Ops! Página não encontrada</h1>
                    <p>Parece que o caminho que você seguiu não existe ou foi movido para outro lugar.</p>
                    
                    <div className="not-found-actions">
                        <Link to="/" className="btn-back-home">
                            Voltar para o Início
                        </Link>
                    </div>

                    <div className="decoration-blobs">
                        <div className="blob blob-blue"></div>
                        <div className="blob blob-yellow"></div>
                        <div className="blob blob-orange"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;
