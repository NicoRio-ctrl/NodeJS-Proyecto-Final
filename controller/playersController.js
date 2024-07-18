import playersdb from "../data/database_backup_24_07_17_2000.json" assert { type: "json" };

export const playerController = {
  // Get all players
  getAll(req, res) {
    console.log('Soy del getAll -> ', playersdb, 'Y su tipo es: ', typeof(playersdb), 'Y su tamanio es: ', playersdb.length)
    playersdb.players.length
      ? res
          .status(200)
          .json({ success: true, message: "List of players", data: playersdb.players })
      : res
          .status(404)
          .json({ success: false, message: "players database empty" });
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
};