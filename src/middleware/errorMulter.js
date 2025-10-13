const errorMulter = (err, req, res, next) => {
  if (err.code && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'La imagen supera el tamaño máximo permitido (2MB).' });
  }
  next();
}

export default errorMulter;