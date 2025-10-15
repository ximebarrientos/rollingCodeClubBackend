const validarAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      mensaje:
        "Acceso denegado. Información de autenticación faltante. (Asegúrese de ejecutar verificarToken primero).",
    });
  }

  if (req.usuario.rol === "administrador") {
    next();
  } else {
    return res.status(403).json({
      mensaje:
        "Acceso denegado. Se requiere rol de administrador para esta acción.",
    });
  }
};

export default validarAdmin;
