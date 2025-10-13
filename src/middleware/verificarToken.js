import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Acceso denegado. Se requiere un token." });
  }

  try {
    const tokenLimpio = token.replace("Bearer ", "");
    const payload = jwt.verify(
      tokenLimpio,
      process.env.JWT_SECRET || "RoLlInGcOdE$Jm1tPq8y*!xZcWvB4"
    );

    req.usuario = payload;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ mensaje: "Token expirado. Inicie sesión nuevamente." });
    }
    res.status(401).json({ mensaje: "Token inválido o corrupto." });
  }
};

export default verificarToken;
