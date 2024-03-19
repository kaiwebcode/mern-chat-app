import express from "express";
import { login, logout, signup } from "../controllers/auth.contoller.js";

const router = express.Router();

// router.get("/login", (req, res) => {
//     console.log("LoginUser")
// })

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); // Corrected route path from "/api/auth/loginout" to "/api/auth/logout"

export default router;
