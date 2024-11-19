import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../App';

const images = [
  "/src/assets/contabilidad.png",
  "/src/assets/finanzas.png",
  "/src/assets/ahorro.png",
];

const Register = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="register-container">
      <div className="image-slider">
        <img src={images[currentImageIndex]} alt="Finance Image" />
      </div>
      <div className="register-form">
        <h1>Regístrate</h1>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Registrarse</button>
        </form>
        <Link to="/">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default Register;