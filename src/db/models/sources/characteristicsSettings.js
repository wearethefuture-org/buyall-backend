module.exports = (sequelize, DataTypes) => {
    const characteristicsSettings = sequelize.define(
        'characteristicsSettings',
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
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'type'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            },
            options: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                field: 'options'
            },
            minOption: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'minOption'
            },
            maxOption: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'maxOption'
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
            tableName: 'characteristics_settings',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return characteristicsSettings;
};
