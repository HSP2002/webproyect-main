import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../App';

const images = [
  "/src/assets/contabilidad.png",
  "/src/assets/curso.png",
  "/src/assets/img.jpeg",
];

function Login() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Iniciar Sesión</button>
          <div className="links">
            <Link to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
      <div className="slider">
        <img src={images[currentImage]} alt="Slider" />
        <p>Administra tus finanzas fácilmente con nuestra herramienta.</p>
      </div>
    </div>
  );
}

export default Login;