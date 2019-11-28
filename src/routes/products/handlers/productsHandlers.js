const ProductService = require('../../../services/product');

const getProducts = async ctx => {
    const productService = new ProductService();
    ctx.response.body = await productService.getProducts();
};

module.exports = {
    getProducts
}