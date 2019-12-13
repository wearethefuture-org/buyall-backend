const BaseModel = require('./baseModel');

class CharacteristicService extends BaseModel {
    async getCharacteristicsSettings() {
        return this.model.characteristicsSettings.findAll({});
    }

    async createCharacteristicSetting(characteristicSetting, subCategoryId) {
        const setting = await this.model.characteristicsSettings.create(characteristicSetting);

        await this.model.subCategoryCharacteristics.create({
            subCategoryId,
            characteristicsSettingsId: setting.dataValues.id
        });

        return setting;
    }

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