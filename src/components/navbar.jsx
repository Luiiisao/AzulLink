import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

// exibe navegação superior da interface
export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo-area">
          <img
            src="/assets/logo-azullink.png"
            alt="AzulLink"
            className="navbar-logo"
          />

          <span className="navbar-subtitulo">
            Central de comunicação operacional
          </span>
        </div>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'ativo' : ''}`}
          >
            Painel
          </Link>

          <Link
            to="/nova-ocorrencia"
            className={`nav-link ${
              location.pathname === '/nova-ocorrencia' ? 'ativo' : ''
            }`}
          >
            Nova ocorrência
          </Link>
        </div>

      </div>
    </nav>
  );
}