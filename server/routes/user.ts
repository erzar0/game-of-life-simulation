import express from "express";
import controller from "../controllers/user";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/validate", isAuth, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/get/all", controller.getAllUsers);

export default router;
//
