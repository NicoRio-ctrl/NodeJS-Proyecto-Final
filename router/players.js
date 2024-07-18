import { Router } from "express";
import { playerController } from "../controller/playersController.js";

export const router = Router();

// GET all players
router.get("/", playerController.getAll);

// GET by search
router.get("/s", playerController.getByName);

// GET player by authId
router.get("/:authId", (req, res) => {
  const { authId } = req.params;
  res.send(`List a player by authID: ${authId}`);
});

// CREATE player by authID
router.post("/", (req, res) => res.send("Create a player"));

// UPDATE player  by authID
router.patch("/:authId", (req, res) => {
  const { authId } = req.params;
  res.send(`Update a player by authId: ${authId}`);
});

//DELETE player by authID
router.delete("/:authId", (req, res) => {
  const { authId } = req.params;
  res.send(`Delete a player by authId: ${authId}`);
});