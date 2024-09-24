import { useState } from 'react';
import { auth } from '../firebase'; // Asegúrate de que esta ruta sea correcta
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa la función
import '../styles/Login-Register.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Login successful', userCredential.user);
      })
      .catch(error => {
        console.error('Login failed', error);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleLogin}>Aceptar</button>
    </div>
  );
};

export default Login;
