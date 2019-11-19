module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err.body;
    ctx.message = err.status;
    ctx.app.emit('error', err, ctx);
  }
};
