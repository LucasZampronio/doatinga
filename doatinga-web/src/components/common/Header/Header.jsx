import { Link, useNavigate } from 'react-router-dom';
import LogoDoatinga from '../../common/Logo/LogoDoatinga';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <section className='Header'>
            <div className='HeaderBarra'>

                <div className='LogoTexto'>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <LogoDoatinga />

                        <div className="texto">
                            <h1>DOATINGA</h1>
                            <p>Conectando corações<br />
                                Transformando vidas</p>
                        </div>
                    </Link>
                </div>

            </div>
            <nav className='HeaderNav'>
                <ul>
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li>Como funciona</li>
                </ul>
            </nav>

            <div className='HeaderInstituicao'>
                {isLoggedIn ? (
                    <div className="HeaderUserActions">
                        <Link to="/perfil" className="HeaderProfileIcon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="#406db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <button onClick={handleLogout} className="btn-logout">Sair</button>
                    </div>
                ) : (
                    <Link to='/login'>Sou Instituição</Link>
                )}
            </div>
        </section>
    );
}

export default Header;
