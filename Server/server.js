const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "web_project" 
});

// Verificar conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Ruta para registrar usuarios
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario en la base de datos
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.error("Error al registrar el usuario:", err);
            res.status(500).json({ error: "Error al registrar el usuario" });
        } else {
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        }
    });
});

// Ruta para iniciar sesión
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error("Error al buscar usuario:", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: "Usuario no encontrado" });
            return;
        }

        const user = results[0];

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ message: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ error: "Contraseña incorrecta" });
        }
    });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
