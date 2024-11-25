import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const images = [
  "/src/assets/contabilidad.png",
  "/src/assets/curso.png",
  "/src/assets/img.jpeg",
];

const Register = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cambiar imágenes cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Manejar registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", { name, email, password });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <div className="container">
      {/* Formulario */}
      <div className="register-form">
        <h2>Regístrate</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Registrarse</button>
          <div className="links">
            <Link to="/">Iniciar Sesión</Link>
          </div>
        </form>
      </div>
      {/* Slider */}
      <div className="slider">
        <img src={images[currentImageIndex]} alt="Slider" />
        <p>Únete y administra tus finanzas con nuestra herramienta.</p>
      </div>
    </div>
  );
};

export default Register;
