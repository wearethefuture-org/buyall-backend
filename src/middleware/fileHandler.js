const multer = require('@koa/multer');
const { match } = require("path-to-regexp");

const { singleFilesUrls, multipleFilesUrls } = require('../enums/Urls');

const upload = multer();

const fileHandler = async (ctx, next) => {
    const { url, method } = ctx.request;

    for (let route of singleFilesUrls) {
        if (method !== route.method) {
            continue;
        }

        const regexp = match(route.url, {decode: decodeURIComponent});

        if (!regexp(url)) {
            continue;
        }

        await upload.single(route.field)(ctx, next);
        return;
    }

    await next();
    return;
};

const filesHandler = async (ctx, next) => {
    const { url, method } = ctx.request;

    for (let route of multipleFilesUrls) {
        if (method !== route.method) {
            continue;
        }

        const regexp = match(route.url, {decode: decodeURIComponent});

        if (!regexp(url)) {
            continue;
        }

        await upload.fields(route.fields)(ctx, next);
        return;
    }

    await next();
    return;
};

module.exports = {
    fileHandler,
    filesHandler
};