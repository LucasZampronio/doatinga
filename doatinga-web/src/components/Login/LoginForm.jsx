import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../common/InputTemplate/InputField';
import Button from '../common/Button';
import './LoginForm.css';
import api from '../../services/api.js';
import { toast } from 'sonner';

import emailIcon from '../../assets/yellowEmailIcon.png'
import passwordIcon from '../../assets/yellowPasswordIcon.png';



function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("/users/signin", { email, password });
            // Se a resposta do post contém dados && contém Token:
            if (response.data && response.data.token) {

                localStorage.setItem('authToken', response.data.token);
                toast.success("Login bem sucedido!");

                navigate('/');
            } else {

                toast.error("Login bem-sucedido, mas nenhum token recebido.");
            }
        } catch (error) {
            toast.error("Erro ao fazer login:", error.response?.data?.message || error.message);
        }
    }

        return (
            <form className = 'login-form' onSubmit = {handleSubmit}>
                <h2 className = 'login-form-title'>Bem Vindo de Volta!</h2>
                    <InputField
                        iconSrc = {emailIcon}
                        iconAlt = 'Ícone de email'
                        type = 'email'
                        placeholder= 'Email'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required = {true}
                    />
                    <InputField
                        iconSrc = {passwordIcon}
                        iconAlt = 'Ícone de senha'
                        type = 'password'
                        placeholder= 'Senha'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required = {true}
                    />
                <Button
                    type = 'submit'
                    className = 'btn-login'
                >
                    Login
                </Button>                    
            </form>
        );
}

export default LoginForm;