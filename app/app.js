import express from 'express';
import dotenv from 'dotenv';
import { loginRouter } from "./routes/login.routes.js";
import passport from 'passport';
import "./middlewares/google.js";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(passport.initialize());

// RUTAS Y PERMISOS DE GOOGLE
app.use("/auth", passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session: false
}), loginRouter);

// SE CAPTURA EL PUERTO QUE SE ENVUENTRA EN LOS AMBIENTES
app.set("port", process.env.PORT || 9999);

// ESTO SE VE EN LA RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("Hola, Bienvenido");
});

export default app;