const ProductService = require('../../../services/product');
const CharacteristicService = require('../../../services/characteristic');

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

                if (!value.hasOwnProperty(characteristic.type + 'Value')) {
                    return;
                }

                product.dataValues[characteristic.name] = value[characteristic.type + 'Value'];
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

            if (!value.hasOwnProperty(characteristic.type + 'Value')) {
                return;
            }

            product.dataValues[characteristic.name] = value[characteristic.type + 'Value'];
        });
    });
    ctx.response.body = product;
};

const createProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 

    const newProduct = ctx.request.body;
    const product = await productService.createProduct(newProduct);
    const characteristics = product.subCategories.characteristics;

    delete product.dataValues.subCategories;
    delete product.dataValues.characteristicsValues;
    
    Object.keys(newProduct).map(field => {
        characteristics.map(characteristic => {
            characteristic = characteristic.dataValues;
            
            if (characteristic.name != field) {
                return;
            }

            if (typeof field != characteristic.type) {
                return;
            }

            const newValue = {
                productId: product.dataValues.id,
                name: field,
                type: characteristic.type
            };
            newValue[characteristic.type + 'Value'] = newProduct[field];

            characteristicService.createCharacteristicValue(newValue);

            product.dataValues[field] = newProduct[field];
        });
    });
    
    ctx.response.body = product;
};

const updateProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 

    const { id } = ctx.params;
    const product = ctx.request.body;

    const updatedProduct = await productService.updateProduct(id, product);
    const values = updatedProduct.characteristicsValues;

    delete updatedProduct.dataValues.subCategories;
    delete updatedProduct.dataValues.characteristicsValues;

    Object.keys(product).map(field => {
        values.map(value => {
            value = value.dataValues;

            if (value.name != field) {
                return;
            };

            if (typeof field != value.type) {
                return;
            }

            const updateValue = {};
            updateValue[value.type + 'Value'] = product[field];

            characteristicService.updateCharacteristicValue(value.id, updateValue);
            updatedProduct.dataValues[field] = product[field];
        });
    });

    ctx.response.body = updatedProduct;
};

const deleteProduct = async ctx => {
    const productService = new ProductService();
    const characteristicService = new CharacteristicService(); 
    const {id} = ctx.params;

    const product = await productService.getProduct(id);
    const values = product.characteristicsValues;

    values.map(value => {
        characteristicService.deleteCharacteristicValue(value.dataValues.id);
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
