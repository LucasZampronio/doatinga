import React from "react";
import { Link } from 'react-router-dom';
import "./LogoDoatinga.css"; 
import logoImagem from '../../../assets/logo_doatinga.png';

function LogoDoatinga({ alignment }) { 
  return (
    <Link to="/" className={`logo logo-${alignment}`}>
      
      <div className="imagem">
        <img
          src={logoImagem}
          alt="logo Doatinga"
          className="container_imagem_logo_Doatinga"
        />
      </div>

    </Link>
  );
}

export default LogoDoatinga;
