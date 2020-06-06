const ProductService = require('../../../services/product');
const CharacteristicService = require('../../../services/characteristic');
const StorageService = require('../../../services/storage');
const FileService = require('../../../services/file');
const Promise = require('bluebird');

const getProducts = async ctx => {
    const productService = new ProductService();

    const offset = ctx.request.query.offset;
    const limit = ctx.request.query.limit;

    ctx.response.body = await productService.getProducts(offset, limit);
};

const getProduct = async ctx => {
    const productService = new ProductService();
    const { id } = ctx.params;
    ctx.response.body = await productService.getProduct(id);
};

const createProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 
    const storageService = new StorageService();

    const { images } = ctx.files;
    const previewImage = ctx.files.previewImage[0];
    const productBody = JSON.parse(ctx.request.body.product);

    const product = await productService.createProduct(productBody);

    await Promise.each(productBody.characteristicsValues, async value => {
        value.productId = product.id;
        await characteristicService.createCharacteristicValue(value);
    });

    if (previewImage) {
        await storageService.uploadFile(previewImage, 'products-images/', {oneProductId: product.id});
    }

    await Promise.each(images || [], async file => {
        await storageService.uploadFile(file, 'products-images/', {manyProductId: product.id});
    });
    
    ctx.response.body = await productService.getProduct(product.id);
};

const updateProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 
    const fileService = new FileService();
    const storageService = new StorageService();

    const { id } = ctx.params;
    const files = ctx.files;
    const productBody = JSON.parse(ctx.request.body.product);
    const mustBeDeletedImages = ctx.request.body.mustBeDeletedImages;

    const product = await productService.getProduct(id);

    if (files.previewImage) {
        if (product.previewImage) {
            await fileService.deleteFile(product.previewImage.id);
        }

        await storageService.uploadFile(files.previewImage[0], 'products-images/', {oneProductId: product.id});
    }

    if (typeof mustBeDeletedImages === 'string') {
        const image = JSON.parse(mustBeDeletedImages);

        await fileService.deleteFile(image.id);
    }
    
    await Promise.each(Array.isArray(mustBeDeletedImages) ? mustBeDeletedImages : [], async img => {
        const image = JSON.parse(img);
        
        await fileService.deleteFile(image.id);
    });
    
    await Promise.each(files.images ? files.images : [], async file => {
        await storageService.uploadFile(file, 'products-images/', {manyProductId: product.id});
    });

    await Promise.each(productBody.characteristicsValues, async value => {
        await characteristicService.updateCharacteristicValue(value.id, value);
    });

    await productService.updateProduct(id, productBody);

    ctx.response.body = await productService.getProduct(product.id);
};

const deleteProduct = async ctx => {
    const productService = new ProductService();
    const { id } = ctx.params;

    const product = await productService.getProduct(id);

    await Promise.each(product.characteristicsValues, async value => {
        await value.destroy();
    });

    ctx.response.body = await productService.deleteProduct(id);
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
