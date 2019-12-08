module.exports = (sequelize, DataTypes) => {
    const characteristicsValues = sequelize.define(
        'characteristicsValues',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
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
            characteristicSettingId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'characteristics_settings',
                    key: 'id'
                },
                field: 'characteristic_setting_id'
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
            stringValue: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'string_value'
            },
            booleanValue: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                field: 'boolean_value'
            },
            integerValue: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'integer_value'
            },
            floatValue: {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'float_value'
            },
            dateValue: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'date_value'
            },
            enumValue: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'enum_value'
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
            tableName: 'characteristics_values',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return characteristicsValues;
};
