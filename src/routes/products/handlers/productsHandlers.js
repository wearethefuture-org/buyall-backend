const ProductService = require('../../../services/product');

const getProducts = async ctx => {
    const productService = new ProductService();
    const products = await productService.getProducts();;

    products.map(product => {
        const characteristics = product.subCategories.characteristics;
        const values = product.characteristicsValues;

        delete product.dataValues.subCategories;
        delete product.dataValues.characteristicsValues;

        characteristics.map(characteristic => {
            characteristic = characteristic.dataValues;
            values.map(value => {
                value = value.dataValues;

                if (value.name != characteristic.name) {
                    return;
                }

                if (characteristic.type === 'string') {
                    product.dataValues[characteristic.name] = value.stringValue;
                }

                if (characteristic.type === 'boolean') {
                    product.dataValues[characteristic.name] = value.booleanValue;
                }

                if (characteristic.type === 'integer') {
                    product.dataValues[characteristic.name] = value.intValue;
                }

                if (characteristic.type === 'float') {
                    product.dataValues[characteristic.name] = value.floatValue;
                }

                if (characteristic.type === 'date') {
                    product.dataValues[characteristic.name] = value.dateValue;
                }
            });
        });
    });

    ctx.response.body = products;
};

const getProduct = async ctx => {
    const productService = new ProductService();
    const { id } = ctx.params;

    const product = await productService.getProduct(id);
    const characteristics = product.subCategories.characteristics;
    const values = product.characteristicsValues;

    delete product.dataValues.subCategories;
    delete product.dataValues.characteristicsValues;

    characteristics.map(characteristic => {
        characteristic = characteristic.dataValues;
        values.map(value => {
            value = value.dataValues;

            if (value.name != characteristic.name) {
                return;
            }

            if (characteristic.type === 'string') {
                product.dataValues[characteristic.name] = value.stringValue;
            }

            if (characteristic.type === 'boolean') {
                product.dataValues[characteristic.name] = value.booleanValue;
            }

            if (characteristic.type === 'integer') {
                product.dataValues[characteristic.name] = value.intValue;
            }

            if (characteristic.type === 'float') {
                product.dataValues[characteristic.name] = value.floatValue;
            }

            if (characteristic.type === 'date') {
                product.dataValues[characteristic.name] = value.dateValue;
            }
        });
    });
    ctx.response.body = product;
};

module.exports = {
    getProducts,
    getProduct
}
