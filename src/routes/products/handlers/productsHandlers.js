const ProductService = require('../../../services/product');
const CharacteristicService = require('../../../services/characteristic');
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

    const product = await productService.createProduct(ctx.request.body.product);
    const values = ctx.request.body.characteristicsValues;

    await Promise.mapSeries(values, async value => {
        value.productId = product.dataValues.id;
        value = await characteristicService.createCharacteristicValue(value);
        product.dataValues.characteristicsValues.push(value);
    });

    ctx.response.body = product;
};

const updateProduct = async ctx => {
    const productService = new ProductService();

    const { id } = ctx.params;
    const product = ctx.request.body;

    const updatedProduct = await productService.updateProduct(id, product);
    const values = updatedProduct.characteristicsValues;

    delete updatedProduct.dataValues.subCategories;
    delete updatedProduct.dataValues.characteristicsValues;

    Object.keys(product).forEach(field => {
        Promise.mapSeries(values, function(value) {
            if (value.dataValues.name != field) {
                return;
            };

            if (typeof field != value.dataValues.type) {
                return;
            }

            const updateValue = {};
            updateValue[value.dataValues.type + 'Value'] = product[field];
            
            value.update(updateValue);
            updatedProduct.dataValues[field] = product[field];

            return value;
        });
    });

    ctx.response.body = updatedProduct;
};

const deleteProduct = async ctx => {
    const productService = new ProductService();
    const {id} = ctx.params;

    const product = await productService.getProduct(id);
    const values = product.characteristicsValues;

    // check maybe cascade delete is better
    Promise.mapSeries(values, function(value) {
        value.destroy();
    });

    ctx.response.body = await productService.deleteProduct(id);
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
