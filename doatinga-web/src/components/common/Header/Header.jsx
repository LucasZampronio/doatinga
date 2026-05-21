import LogoDoatinga from '../../common/Logo/LogoDoatinga';
import './Header.css';

function Header() {
    return (
        <section className='Header'>
            <div className='HeaderBarra'>

                <div className='LogoTexto'>
                    <LogoDoatinga />

                    <div className="texto">
                        <h1>DOATINGA</h1>
                        <p>Conectando corações<br />
                            Transformando vidas</p>
                    </div>
                </div>

            </div>
            <nav className='HeaderNav'>
                <ul>
                    <li>Início</li>
                    <li>Catálogo</li>
                    <li>Como funciona</li>
                </ul>
            </nav>

            <div className='HeaderInstituicao'>
                <a href='/login'>Sou Instituição</a>
            </div>
        </section>
    );
}

export default Header;
