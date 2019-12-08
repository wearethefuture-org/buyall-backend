module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define(
        'categories',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
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
            tableName: 'categories',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return categories;
};
