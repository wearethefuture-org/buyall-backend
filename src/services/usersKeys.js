const BaseModel = require('./baseModel');

class UserKeysService extends BaseModel {
    async createUserKey(id) {
        const body = {
            userId: id,
            key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
        return this.model.usersKeys.create(body) 
    }

    async getUserKey(key) {
        return this.model.usersKeys.findOne({
            where: {
                key 
            }
        });
    }

    async deleteUserKey(id) {
        return this.model.usersKeys.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UserKeysService;
