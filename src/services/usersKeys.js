const BaseModel = require('./baseModel');

class UserKeysService extends BaseModel {
    async createUserKey(id) {
        const body = {
            userId: id,
            key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
        console.log(body)
        return this.model.usersKeys.create(body) 
    }
}

module.exports = UserKeysService;
