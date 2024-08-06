import { Router } from "express";
import { userController} from '../controller/usersController.js';
import { token } from "../service/jwt.js";
import { isAdmin } from "../service/authMiddleware.js";

export const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/", token.validate, isAdmin, userController.getAll);
router.get("/:id", token.validate, isAdmin, userController.getById);
router.patch("/:id", token.validate, isAdmin, userController.changeUser);
router.delete("/:id", token.validate, isAdmin, userController.deleteUser);