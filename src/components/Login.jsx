import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const images = [
  "/src/assets/contabilidad.png",
  "/src/assets/curso.png",
  "/src/assets/img.jpeg",
];

function Login() {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cambiar imágenes cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Manejar inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      {/* Formulario */}
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
          <div className="links">
            <Link to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
      {/* Slider */}
      <div className="slider">
        <img src={images[currentImage]} alt="Slider" />
        <p>Administra tus finanzas fácilmente con nuestra herramienta.</p>
      </div>
    </div>
  );
}

export default Login;
