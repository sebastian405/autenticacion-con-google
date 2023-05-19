import { Router, response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";

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
dash.get("/usuario", async(req, res) => {
    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);

            let ruta = "http://localhost:3000/api/user";
            let option = {
                method: "GET"
            };

            let datos = {};

            const result = await fetch(ruta, option)
            
            .then(response => response.json())
            .then(data => {
                datos = data[0];
                // console.log(data[0]);
            })
            .catch(error => console.error("Este es el error: " + error))

            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 1,
                "datos": datos
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

//Insertar informacion desde formulario
dash.post("/guardar", (req, res) => {
    if(req.body.name){

        let data = {
            name: req.body.name
        };
        let metodo = "post";

        if(req.body.id){
            data = {
                id: req.body.id,
                name: req.body.name
            };
            metodo = "put"
        }

        let ruta = "http://localhost:3000/api/user";
        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const result = fetch(ruta, option)
            .then(res => res.json())
            .then(data => {
                //aqui vamos
            })
            .catch(err => console.log("Error al consumir API: " + err))
            res.redirect("/v1/usuario");
        } catch (error) {
            
        }

    }else{
        console.send("Este es el error: " );
    }
});

dash.get("/edit-user", (req, res) => {
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
        id: id,
        name: name
    }

    if (req.cookies.ckmp){
        try {
            const token = jwt.verify(req.cookies.ckmp, process.env.SECRET_KEY);

            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 4,
                "datos": datos
            });

        } catch(error){
            console.error("error con el token" + error);
        }
    }
})

// Ruta para salir del dash
dash.get("/salir", (req, res) => {
    res.clearCookie("ckmp");
    res.redirect("/");
});

export default dash;