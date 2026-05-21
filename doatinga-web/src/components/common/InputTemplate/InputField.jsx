import React from 'react';
import './InputField.css';
import { findInputError, isFormInvalid } from '../../../utils/index';
import { useFormContext } from 'react-hook-form';
//import { MdError } from 'react-icons/md';



function InputField({ 
  iconSrc, 
  iconAlt = "Ícone do campo", 
  type, 
  placeholder, 
  value, 
  onChange,
  required = false 
}) {
  return (
    <div className="input-field-container">
      <span className="input-icon">
        <img 
          src={iconSrc}
          alt={iconAlt} 
        />
      </span>
      
      <input 
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required} 
      />
    </div>
  );
}

export default InputField;