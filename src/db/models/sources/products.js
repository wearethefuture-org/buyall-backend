module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define(
        'products',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            subCategoryId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                model: 'sub_categories',
                key: 'id'
                },
                field: 'sub_category_id'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            },
            img: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'img'
            },
            available: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'available'
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'amount'
            },
            isPromotion: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'is_promotion'
            },
            discount: {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'discount'
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'weight'
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'price'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW'),
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            }
        },
        {
            tableName: 'products',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return products;
};
