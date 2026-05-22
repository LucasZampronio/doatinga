import React from 'react';
import styles from './Legend.module.css';

const Legend = () => {
  return (
    <div className={styles.legendContainer}>
      <h4>Legenda</h4>
      <div className={styles.legendItem}>
         <div className={styles.iconCircle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#F3922B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#F3922B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
         <span>Pontos de doação</span>
      </div>
      <div className={styles.legendItem}>
         <div className={styles.iconCircle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10V21H12V10M3 10L12 3L21 10M21 10V21H18V14H15V21" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
         <span>Abertos agora</span>
      </div>
    </div>
  );
};

export default Legend;
