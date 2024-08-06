import { Router } from "express";
import { playerController } from "../controller/playersController.js";
import { token } from "../service/jwt.js";
import { isAdmin } from "../service/authMiddleware.js";

export const router = Router();

// CREATE player by authID
router.post("/", playerController.addOnePlayer);

// GET all players
router.get("/", token.validate, playerController.getAll);

// GET by search
router.get("/s", token.validate, playerController.getByName);

// GET by search
router.get("/s1", token.validate, playerController.getByNameInclude);

// GET player by authId
router.get("/:authId", token.validate, playerController.getByAuthId);

// UPDATE player by authID
router.patch("/:authId", token.validate, isAdmin, playerController.updateOnePlayer);

// DELETE player
router.delete("/:authId", token.validate, isAdmin, playerController.deleteOnePlayer);