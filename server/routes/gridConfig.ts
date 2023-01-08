import express from "express";
import { isAuth } from "../middleware/isAuth";
import controller from "../controllers/gridConfig";

const router = express.Router();

router.get("/get/all", controller.getAll);
router.get("/get/user", isAuth, controller.getUserConfigs);
router.post("/", isAuth, controller.addGridConfig);

export default router;
