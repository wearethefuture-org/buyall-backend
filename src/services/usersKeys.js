const BaseModel = require('./baseModel');
const generateRandomString = require('../utils/generateRandomString');

class UserKeysService extends BaseModel {
    async createUserKey(id) {
        const body = {
            userId: id,
            key: generateRandomString()
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
