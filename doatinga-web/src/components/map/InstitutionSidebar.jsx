import React from 'react';
import styles from './InstitutionSidebar.module.css';

const InstitutionSidebar = ({ institutions, onSelect }) => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <h3>Pontos de doação</h3>
        <p>{institutions.length} lugares encontrados</p>
      </header>
      
      <div className={styles.scrollArea}>
        {institutions.map(inst => (
          <div 
            key={inst.id} 
            className={styles.instCard}
            onClick={() => onSelect(inst)}
          >
            <h4>{inst.name}</h4>
            <p className={styles.address}>{inst.street}, {inst.number} - {inst.neighborhood}</p>
            
            <div className={styles.infoRow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>Seg - Sex: 08h - 18h</p> 
            </div>

            <div className={styles.tagRow}>
              <span className={styles.tag}>Alimentos</span>
              <span className={styles.tag}>Roupas</span>
              <span className={styles.tagCount}>+1</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default InstitutionSidebar;
