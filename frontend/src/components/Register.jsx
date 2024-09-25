import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login-Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]= useState("")

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password,name)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        console.log('Registro exitoso:', user);
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
      className='input name'
      onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="button" onClick={handleRegister}>Aceptar</button>
    </div>
  );
};

export default Register;
