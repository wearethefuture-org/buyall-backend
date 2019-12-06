module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('sub_category_characteristics', {
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
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    }),
  down: queryInterface => queryInterface.dropTable('sub_category_characteristics', {})
};