import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './AuthAside.css';


function AuthAside({
    title,
    subtitle, 
    buttonText, 
    navigateTo,
    backGroundVariant,
    textVariant,
    buttonVariant,
    children /* lugares pra colocar logo ou outros elementos */
}) {
     const navigate = useNavigate();
     const handleNavigate = () => {
        navigate(navigateTo);
    };


    return (
        <aside className={`auth-aside ${backGroundVariant} ${textVariant}`}>
            <div className = "auth-aside-top-content">
                {children} 
            </div>

            <div className = "auth-aside-main-content">
                <h2 className="auth-aside-title">{title}</h2>
                <p className="auth-aside-subtitle">{subtitle}</p>

                <Button
                    type="button"
                    className={buttonVariant === "primary" ? "btn-primary" : "btn-secondary"}
                    onClick={handleNavigate}
                >
                    {buttonText}
                </Button>
            </div>
        </aside>
    );
}

export default AuthAside;