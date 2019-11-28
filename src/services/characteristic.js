const BaseModel = require('./baseModel');

class CharacteristicService extends BaseModel {
    async createCharacteristicValue(characteristicValue) {
        return this.model.characteristicsValues.create(characteristicValue);
    }

    async updateCharacteristicValue(id, characteristicValue) {
        return this.model.characteristicsValues.update(characteristicValue, {
            where: {
                id
            }
        });
    }

    async deleteCharacteristicValue(id) {
        return this.model.characteristicsValues.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CharacteristicService;