import React, { useState } from 'react';
import './RecoverAccountModal.css';
import EmailIcon from '../../assets/Email.svg';

function RecoverAccountModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleNext = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Digite um email válido');
        } else {
            setError('');
            // Lógica para enviar email de recuperação
            console.log('Recuperar conta para:', email);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Recuperar sua conta</h2>
                <p>Digite seu email para receber sua nova senha.</p>
                
                <div className="modal-input-container">
                    <img src={EmailIcon} alt="Email" className="modal-input-icon" />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                        }}
                    />
                </div>
                {error && <span className="modal-error-text">{error}</span>}

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                    <button className="btn-next" onClick={handleNext}>Avançar</button>
                </div>
            </div>
        </div>
    );
}

export default RecoverAccountModal;
