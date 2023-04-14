import { Router } from "express";

const router = Router();

router.get("/",(req, res) => {
    res.render("backOffice");
});

export default router;