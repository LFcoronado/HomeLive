import '../styles/NavMenu.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; 
import { useEffect, useState } from 'react';

const NavMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="nav-menu">
      <Link to="/filtered-properties" className="nav-link">
        Propiedades
      </Link>
      {user && (
        <>
          <Link to="/add-property" className="nav-link">
            Agregar propiedad
          </Link>
        </>
      )}
    </div>
  );
};

export default NavMenu;
