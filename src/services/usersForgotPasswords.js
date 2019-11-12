const BaseModel = require('./baseModel');

class UsersForgotPasswordsService extends BaseModel {
    async createForgotPasswordKey(id) {
        const body = {
            userId: id,
            key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        };
        return this.model.usersForgotPasswords.create(body);
    }

    async updateForgotPasswordKey(id, key) {
        return this.model.usersForgotPasswords.update(key, {
            where: {
                id
            }
        });
    }

    async getForgotPasswordKey(userId) {
        return this.model.usersForgotPasswords.findOne({
            where: {
                userId
            }
        });
    }

    async deleteForgotPasswordKey(id) {
        return this.model.usersForgotPasswords.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UsersForgotPasswordsService;
