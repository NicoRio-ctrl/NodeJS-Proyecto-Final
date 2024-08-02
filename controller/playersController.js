import { PlayerFormat } from "../model/mongoDB/playerModel.js";

export const playerController = {


    async getAll(req, res) {
      const playerCollection = await PlayerFormat.find();
      playerCollection
        ? res.status(200).json({
            success: true,
            message: "List of players",
            data: playerCollection})
        : res
            .status(404)
            .json({ success: false, message: "Players database empty" });
    },
  
  // Get by name
  getByName(req, res) {
    const { name } = req.query;
    if(name){
      const playerName = playersdb.players.filter(p => p.player.name === name);
      console.log('Soy el playerName filtrado', playerName)
      res
        .status(200)
        .json({success: true, message: `Player: ${JSON.stringify(playerName)}`})}
      else
      {
        res
        .status(400)
        .json({ success: false, message: "Missing 'name' query param" });
      } 
  },

  // Get by name include
    getByNameInclude(req, res) {
      const { name } = req.query;
      if(name){
        const playerName = playersdb.players.filter(p => p.player.name.includes(name));
        console.log('Soy el playerName filtrado', playerName)
        res
          .status(200)
          .json({success: true, message: `Player: ${JSON.stringify(playerName)}`})}
        else
        {
          res
          .status(400)
          .json({ success: false, message: "Missing 'name' query param" });
        } 
    },


    async addOnePlayer(req, res) {
      const { player, stats, controlParams, authId, connId } = req.body;
      const newPlayer = new PlayerFormat({
         player, 
         stats, 
         controlParams, 
         authId, 
         connId,
      });
      try {
        await newPlayer.save();
        res.status(200).json({ success: true, data: newPlayer });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    },


    async getByAuthId(req, res) {
      try {
        const playerId = req.params.authId;
        const playerData = await PlayerFormat.findById(playerId);
    
        if (!playerData) {
          return res.status(404).json({ success: false, message: "Player not found" });
        }
    
        res.status(200).json({ success: true, message: `Player found: ${playerData}` });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    async updateOnePlayer(req, res) {
      try {
        const playerId = req.params.authId;
        const updateData = req.body; 

        const playerData = await PlayerFormat.findById(playerId);
        
        if (!playerData) {
          return res.status(404).json({ success: false, message: "Player not found" });
        }

        const updatedPlayer = await PlayerFormat.findByIdAndUpdate(playerId, updateData, { new: true });
    
        res.status(200).json({ success: true, message: "Player updated successfully", playerData: updatedPlayer });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    async deleteOnePlayer(req, res) {
      try {
        const playerId = req.params.authId;
        const deletedPlayer = await PlayerFormat.findByIdAndDelete(playerId);

        if (!deletedPlayer) {
          return res.status(404).json({ success: false, message: "Player not found" });
        }
        console.log(`Jugador eliminado: ${deletedPlayer}`);

        res.status(200).json({ success: true, message: "Player deleted" });
      } catch (err) {
        res.status(308).json({ success: false, message: err.message });
      }
    },

    async calcTopGoals(req, res) {
      try {
        // Obtener todos los jugadores de la base de datos
        const players = await PlayerFormat.find();
        console.log('Players fetched from DB:', players);
        
        // Ordenar los jugadores por el número de goles
        const topGoals = players.slice().sort((a, b) => b.stats.goals - a.stats.goals);
    
        // Imprimir el array de topGoals en un formato legible
        console.log('Top goals sorted:', JSON.stringify(topGoals, null, 2));
        
        if (topGoals.length > 0) {
          res.status(200).json({ success: true, data: topGoals });
        } else {
          res.status(404).json({ success: false, message: "No players found" });
        }
      } catch (err) {
        console.error('Error in calcTopGoals:', err);
        res.status(500).json({ success: false, message: err.message });
      }
    }
    


};

// function calcGoals() {
//   topGoals = listPlayers.slice().sort((a, b) => b.stats.goals - a.stats.goals);
// }

// // Calcula el top de asistencias
// function calcAsists() {
//   topAsists = listPlayers
//     .slice()
//     .sort((a, b) => b.stats.asists - a.stats.asists);
// }

// // Calcula el top de goles en contra
// function calcGoalsAgainsts() {
//   topGoalsAgainst = listPlayers
//     .slice()
//     .sort((a, b) => b.stats.goalsAgainst - a.stats.goalsAgainst);
// }
