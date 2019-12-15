const BaseModel = require('./baseModel');

class CharacteristicService extends BaseModel {
    async getCharacteristicsSettings() {
        return await this.model.characteristicsSettings.findAll({});
    }

    async getCharacteristicSetting(id) {
        return await this.model.characteristicsSettings.findOne({
            where: {
                id
            }
        });
    }

    async createCharacteristicSetting(characteristicSetting, subCategoryId) {
        const setting = await this.model.characteristicsSettings.create(characteristicSetting);

        await this.model.subCategoryCharacteristics.create({
            subCategoryId,
            characteristicsSettingsId: setting.dataValues.id
        });

        return setting;
    }

    async updateCharacteristicSetting(id, characteristicSetting) {
        return await this.model.characteristicsSettings.update(characteristicSetting, {
            where: {
                id
            }
        });
    }

    async getCharacteristicValue(id) {
        return await this.model.characteristicsValues.findOne(id);
    }

    async createCharacteristicValue(characteristicValue) {
        return await this.model.characteristicsValues.create(characteristicValue);
    }

    async updateCharacteristicValue(id, characteristicValue) {
        return await this.model.characteristicsValues.update(characteristicValue, {
            where: {
                id
            }
        });
    }

    async deleteCharacteristicValue(id) {
        return await this.model.characteristicsValues.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CharacteristicService;