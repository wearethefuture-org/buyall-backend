const multer = require('@koa/multer');

const upload = multer();

const fileHandler = async (ctx, next) => {
    // TODO: check routes
    await upload.single('file')(ctx, next);

    // await next();
};

module.exports = fileHandler;