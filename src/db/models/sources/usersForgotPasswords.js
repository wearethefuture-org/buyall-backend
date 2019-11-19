module.exports = (sequelize, DataTypes) => {
    const usersForgotPasswords = sequelize.define(
        'usersForgotPasswords',
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
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'key'
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
            tableName: 'users_forgot_passwords',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
    return usersForgotPasswords;
};
