module.exports = (sequelize, DataTypes) => {
    const subCategoryCharacteristics = sequelize.define(
        'subCategoryCharacteristics',
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
            characteristicsSettingsId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                model: 'characteristics_settings',
                key: 'id'
                },
                field: 'characteristics_settings_id'
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
            tableName: 'sub_category_characteristics',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return subCategoryCharacteristics;
};
