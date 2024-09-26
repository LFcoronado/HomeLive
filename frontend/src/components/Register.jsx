import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import '../styles/Login-Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;

        // Actualizar el perfil del usuario con el nombre
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          console.log('Perfil actualizado con nombre:', user.displayName);
        }).catch((error) => {
          console.error('Error al actualizar el perfil:', error);
        });

        alert('Registro exitoso:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de registro:', errorCode, errorMessage);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Registrarse</h2>
      <input
        type="email"
        placeholder="Correo Electrónico"
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
      <input
        type='text'
        placeholder='Nombre'
        value={name}
        className='input'
        onChange={(e) => setName(e.target.value)}
      />
      <button className="button" onClick={handleRegister}>Aceptar</button>
    </div>
  );
};

export default Register;
