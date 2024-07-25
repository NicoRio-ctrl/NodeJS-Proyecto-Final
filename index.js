import express from "express";
import "dotenv/config";
import "./config/db.js";
import { router as playersRouter } from "./router/players.js";
import { loadDB } from "./service/loadDB.js";


const app = express();
const PORT = process.env.PORT ?? 5892;


(/*async*/ () => {
  try {
    // await loadDB();
    // console.log('Base de datos cargada');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api/v1/players", playersRouter);

    app.listen(PORT, (err) => {
      console.log(
        err ? `Error launching server: ${err.message}` : `Server running on port http://127.0.0.1:${PORT} \n Ctrl + C to exit...`
      );
    });
  } catch (error) {
    console.error('Failed to load database:', error);
  }
})();










// loadDB();
// console.log('Base de datos cargada');


// app.listen(PORT, (err) => {
//   console.log(
//     err? `Error launching server: ${err.message}` : `Server running on port http://127.0.0.1:${PORT} \n Ctrl + C to exit...`
//   );
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/api/v1/players", playersRouter);