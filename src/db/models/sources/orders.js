module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define(
        'orders ',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                model: 'users',
                key: 'id'
                },
                field: 'user_id'
            },
            productId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                model: 'products',
                key: 'id'
                },
                field: 'product_id'
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'amount'
            },
            status: {
                type: DataTypes.ENUM('in cart', 'paided', 'sent', 'delivered', 'taken'),
                allowNull: false,
                defaultValue: 'in cart',
                field: 'status'
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
            tableName: 'orders',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return orders;
};
