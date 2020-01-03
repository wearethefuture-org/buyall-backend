module.exports = (sequelize, DataTypes) => {
    const files = sequelize.define(
        'files',
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
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'url'
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
            tableName: 'files',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return files;
};
