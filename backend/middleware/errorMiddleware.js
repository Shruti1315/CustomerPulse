export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : err.name === 'CastError' ? 400 : err.code === 11000 ? 409 : 500);
  const message = err.code === 11000 ? 'A record with this value already exists' : err.message || 'Internal server error';
  if (process.env.NODE_ENV !== 'production') console.error(err);
  res.status(status).json({ success: false, message });
}
