import { useState, useEffect } from 'react';
import Login from './Login';  
import Register from './Register';  
import '../styles/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Iconos
import { auth } from '../firebase'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = (isLogin) => {
    setIsLoginMode(isLogin);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="header">
      <h1>HOME LIVE</h1>
      <div className="user-menu">
        {user ? (
          <div onClick={toggleMenu} className="dropdown-trigger">
            <span className="user-greeting">Hola, {user.displayName || user.email}</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
            
          </div>
        ) : (
          <i className="fas fa-user" onClick={toggleMenu}></i>
        )}
        {!user && isMenuOpen && (
          <div className="dropdown-content">
            <button onClick={() => openModal(true)}>Iniciar sesión</button>
            <button onClick={() => openModal(false)}>Registrarse</button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>×</button>
            {isLoginMode ? <Login /> : <Register />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header; 
