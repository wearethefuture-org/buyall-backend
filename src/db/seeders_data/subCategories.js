const categories = require('./categories');
const products = require('./products');
const characteristicsSettings = require('../seeders_data/characteristicsSettings');

const subCategories = {};

subCategories[categories.electronics.name] = {
    laptops: {
        name: 'Laptops',
        description: 'Laptops & Netbooks sub category',
        img: 'https://i.ebayimg.com/thumbs/images/g/rnEAAOSwBt5ZJXh6/s-l225.webp',
        created_at: new Date(),
        updated_at: new Date(),
        settings: [
            characteristicsSettings.screenSize,
            characteristicsSettings.color,
            characteristicsSettings.ram
        ],
        products: [
            products.dell
        ]
    },
    smartphones: {
        name: 'Smartphones',
        description: 'Cell Phones & Smartphone sub category',
        img: 'https://i.ebayimg.com/thumbs/images/g/dp0AAOSwuThbjPcb/s-l225.webp',
        created_at: new Date(),
        updated_at: new Date(),
        settings: [
            characteristicsSettings.screenSize,
            characteristicsSettings.color,
            characteristicsSettings.ram
        ],
        products: [
            products.samsung
        ]
    }
};

subCategories[categories.clothes.name] = {
    'men\'s': {
        name: 'Men\s',
        description: 'Men\'s clothing',
        img: 'https://webcomicms.net/sites/default/files/clipart/159412/mens-clothing-pictures-159412-8638888.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        settings: [
            characteristicsSettings.clothingSize,
            characteristicsSettings.color
        ],
        products: [
            products.nike
        ]
    },
    'women\'s': {
        name: 'Women\'s',
        description: 'Women\'s clothing',
        img: 'https://ae01.alicdn.com/kf/HTB1ICh_N9zqK1RjSZPxq6A4tVXam/Dress-Women-100-Silk-Fabric-Printed-V-Neck-Short-Sleeves-High-Waist-Vintage-Style-Dress-New.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        settings: [
            characteristicsSettings.clothingSize,
            characteristicsSettings.color
        ],
        products: [
            products.alpina
        ]
    }
};

module.exports = subCategories;
