import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; 
import { useCarrito } from '../context/CarritoProvider';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const { totalItems } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand logo" to="/index.html">
          GreenBite
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto" id="navbar-items-container">
            <li className="nav-item"><NavLink className="nav-link" to="/index.html">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos.html">Productos</NavLink></li>
            
            {usuario ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/perfil.html">¡Hola, {usuario.nombre}!</NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-danger" href="#" onClick={logout} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    Cerrar Sesión
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                    Iniciar Sesión
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registroModal">
                    Registro
                  </a>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex ms-2">
            <button 
              className="btn btn-success position-relative"
              data-bs-toggle="modal" 
              data-bs-target="#modalCarrito"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                  <span className="visually-hidden">productos en el carrito</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
