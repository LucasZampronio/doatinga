import { useState } from 'react';
import InputField from '../common/InputTemplate/InputField.jsx';
import Button from '../common/Button.jsx';
import './RegisterForm.css';
import api from '../../services/api.js';

import userIcon from '../../assets/userIcon.png';
import emailIcon from '../../assets/emailIcon.png';
import passwordIcon from '../../assets/passwordIcon.png';
import { toast } from 'sonner';


function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isDisabled = !name || !password || !email;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            await api.post("/users/signup", { name, email, password });
            toast.success("Cadastro bem sucedido!")

        } catch (error) {

            console.log("ERRO FRONT:", error);
        }

        console.log('Dados do Formulário: ');
        console.log({
            name: name,
            email: email,
            password: password
        });
    }
    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Criar Conta</h2>
            <InputField
                iconSrc={userIcon}
                iconAlt='Ícone do usuário'
                type='text'
                placeholder='Nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
            />

            <InputField
                iconSrc={emailIcon}
                iconAlt='Ícone de email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
            />

            <InputField
                iconSrc={passwordIcon}
                iconAlt='Ícone de senha'
                type='password'
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}

            />
            <Button
                type='submit'
                className='btn-register'
                disabled={isDisabled}
                
            >
                Cadastrar
            </Button>
        </form>
    );
}

export default RegisterForm;


