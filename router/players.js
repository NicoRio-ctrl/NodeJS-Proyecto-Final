import { Router } from "express";
import { playerController } from "../controller/playersController.js";
import { token } from "../service/jwt.js"



export const router = Router();

// GET all players
router.get("/",  token.validate, playerController.getAll);

// GET by search
router.get("/s", playerController.getByName);

// GET by search
router.get("/s1", playerController.getByNameInclude);

// // GET player by authId
router.get("/:authId", playerController.getByAuthId);

// CREATE player by authID
router.post("/", playerController.addOnePlayer);

// UPDATE player  by authID
router.patch("/:authId", playerController.updateOnePlayer);
// router.patch("/:authId", (req, res) => {
//   const { authId } = req.params;
//   res.send(`Update a player by authId: ${authId}`);
// });

//DELETE player
router.delete("/:authId", playerController.deleteOnePlayer);

router.get("/top", playerController.calcTopGoals);