import playersdb from "../data/database_backup_24_07_24_1758.json" assert { type: "json" };

export const loadDB = async () => {
    // Condicion de salida
    if(playersdb.players.length === 0) return 
    
    console.log("Iniciando carga de base de datos...");

    const url_base = 'http://127.0.0.1:5892/api/v1/players';

    const playerPromises = playersdb.players.map(async (p) => {
        try {
            const response = await fetch(url_base, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(p),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error al agregar jugador: ${errorData.message}`);
            } else {
                const data = await response.json();
                console.log(`Jugador ${p.player.name} agregado con éxito`, data);
            }
        } catch (error) {
            console.error(`Error al agregar jugador ${p.player.name}:`, error);
        }
    });

    await Promise.all(playerPromises);
    console.log("Todos los jugadores han sido agregados exitosamente");
}

// getAll(req, res) {
//     console.log('Soy del getAll -> ', playersdb, 'Y su tipo es: ', typeof(playersdb), 'Y su tamanio es: ', playersdb.length)
//     playersdb.players.length
//         ? res
//             .status(200)
//             .json({ success: true, message: "List of players", data: playersdb.players })
//         : res
//             .status(404)
//             .json({ success: false, message: "players database empty" });
// }