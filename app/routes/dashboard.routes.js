import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const dash = Router();

// Ruta vista inicio
dash.get("/inicio", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 0
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta vista usuarios
dash.get("/usuario", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 1
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta para ver productos
dash.get("/producto", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 2
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta para ver categorias
dash.get("/categoria", (req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);
            
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 3
            });

        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

// Ruta para salir del dash
dash.get("/salir", (req, res) => {
    res.clearCookie("ckmp");
    res.redirect("/");
});

export default dash;