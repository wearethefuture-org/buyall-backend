const characteristicsSettings = require('../seeders_data/characteristicsSettings');

const dell = {
    name: 'Dell Inspiron 3582',
    description: 'Dell Inspiron 3582',
    img: 'https://i2.rozetka.ua/goods/11851334/copy_dell_3582n54s1ihd_lbk_5cb841f284bbe_images_11851334334.jpg',
    available: true,
    amount: 5,
    isPromotion: false,
    weight: 3,
    price: 500,
    values: [
        {
            setting: characteristicsSettings.screenSize,
            name: 'Screen Size',
            type: 'float',
            floatValue: '16.6'
        },
        {
            setting: characteristicsSettings.ram,
            name: 'RAM',
            type: 'integer',
            integerValue: '8'
        },
        {
            setting: characteristicsSettings.color,
            name: 'Color',
            type: 'string',
            stringValue: 'black'
        }
    ]  
};

const samsung = {
    name: 'Samsung Galaxy S9',
    description: 'Samsung Galaxy S9',
    img: 'https://i1.rozetka.ua/goods/3249371/samsung_galaxy_s9_64gb_black_images_3249371727.jpg',
    available: true,
    amount: 3,
    isPromotion: true,
    discount: 100,
    weight: 0.5,
    price: 600,
    values: [
        {
            setting: characteristicsSettings.screenSize,
            name: 'Screen Size',
            type: 'float',
            floatValue: '6.3'
        },
        {
            setting: characteristicsSettings.ram,
            name: 'RAM',
            type: 'integer',
            integerValue: '4'
        },
        {
            setting: characteristicsSettings.color,
            name: 'Color',
            type: 'string',
            stringValue: 'white'
        }
    ]  
};

const nike = {
    name: 'Nike Wmns Ryz 365',
    description: 'Nike Wmns Ryz 365',
    img: 'https://i2.rozetka.ua/goods/15522167/nike_193151405913_images_15522167795.jpg',
    available: true,
    amount: 3,
    isPromotion: true,
    discount: 100,
    weight: 1,
    price: 500,
    values: [
        {
            setting: characteristicsSettings.clothingSize,
            name: 'Clothing size',
            type: 'string',
            stringValue: 'XXL'
        },
        {
            setting: characteristicsSettings.color,
            name: 'Color',
            type: 'string',
            stringValue: 'brown'
        }
    ]
};

const alpina = {
    name: 'Alpina 89881',
    description: 'Alpina 89881',
    img: 'https://i1.rozetka.ua/goods/10862119/alpina_3838421136278_images_10862119005.jpg',
    available: true,
    amount: 3,
    isPromotion: true,
    discount: 100,
    weight: 1,
    price: 500,
    values: [
        {
            setting: characteristicsSettings.clothingSize,
            name: 'Clothing size',
            type: 'string',
            stringValue: 'XL'
        },
        {
            setting: characteristicsSettings.color,
            name: 'Color',
            type: 'string',
            stringValue: 'red'
        }
    ]
};

module.exports = {
    dell,
    samsung,
    nike,
    alpina
};
