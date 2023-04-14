import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/google", (req, res) => {
    const id = req.user.id;
    const name = req.user.displayName;
    const email = req.user.emails[0].value;

    res.render("backOffice", {
        nombre: name
    });
});

export { loginRouter };