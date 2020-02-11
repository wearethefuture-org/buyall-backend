module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define(
        'comments',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
              },
              message:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'message'
              },
              userId:{
                type: DataTypes.BIGINT,
                references:{
                  model: 'users',
                  key: 'id'
                },
                field: 'userId'
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
            tableName: 'comments',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return comments;
};
