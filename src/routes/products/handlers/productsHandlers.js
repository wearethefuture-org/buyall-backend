const ProductService = require('../../../services/product');
const CharacteristicService = require('../../../services/characteristic');
const StorageService = require('../../../services/storage');
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

    const { body } = ctx.request;

    const productBody = JSON.parse(body.product);
    
    const product = await productService.createProduct(productBody );

    await Promise.each(productBody.characteristicsValues, async value => {
        value.productId = product.id;
        await characteristicService.createCharacteristicValue(value);
    });

    await Promise.each(ctx.files.files, async (file, index) => {
        if (index === 0) {
            await storageService.uploadFile(file, 'products-images/', {oneProductId: product.id});
            return;
        }
        
        await storageService.uploadFile(file, 'products-images/', {manyProductId: product.id});
    });
    
    ctx.response.body = await productService.getProduct(product.id);
};

const updateProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 
    const { id } = ctx.params;

    await Promise.each(ctx.request.body.characteristicsValues, async value => {
        await characteristicService.updateCharacteristicValue(value.id, value);
    });

    ctx.response.body = (await productService.updateProduct(id, ctx.request.body))[0];
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
