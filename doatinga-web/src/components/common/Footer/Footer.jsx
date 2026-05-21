import ifLogo from '../../../assets/logo-ifrs 1.svg';
import coracao from '../../../assets/Coracao.svg';
import email from '../../../assets/email.svg';
import LogoDoatinga from '../Logo/LogoDoatinga';
import './Footer.css';

function Footer() {
    return (
        <footer className='Footer'>
            <div className='Footer__content'>
                <div className='Footer__brand'>
                    <LogoDoatinga />
                </div>

                <div className='Footer__links'>
                    <h2>Links úteis</h2>
                    <ul>
                        <li>Cadastro de pontos de coleta</li>
                        <li>Pontos parceiros</li>
                    </ul>
                </div>

                <div className='Footer__contact'>
                    <h2>Contato</h2>
                    <ul>
                        <li>
                            <img src={email} alt='Ícone de e-mail' />
                            <span>Devs</span>
                        </li>
                        <li>
                            <img src={coracao} alt='Ícone de coração' />
                            <span>Feito com amor!</span>
                        </li>
                    </ul>
                </div>

                <div className='Footer__partner'>
                    <img src={ifLogo} alt='Instituto Federal do Rio Grande do Sul' />
                </div>
            </div>

            <div className='Footer__bottom'>
                <p>© 2025 DoaTinga-Devs. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
