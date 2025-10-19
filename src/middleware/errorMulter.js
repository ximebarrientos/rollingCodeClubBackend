const errorMulter = (err, req, res, next) => {
  if (err instanceof Error && err.message.includes("Formato de imagen")) {
    return res.status(400).json({ mensaje: err.message });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ mensaje: "La imagen no puede superar los 2 MB de tamaño." });
  }
  next();
};

export default errorMulter;