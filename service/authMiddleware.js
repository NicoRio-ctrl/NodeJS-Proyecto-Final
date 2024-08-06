import { User } from "../model/mongoDB/user.js";

// Middleware para verificar si el usuario es administrador
export const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (!user.admin) return res.status(403).json({ message: "Acceso denegado: no tienes privilegios de administrador" });

    
    next();
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error del servidor" });
  }
};