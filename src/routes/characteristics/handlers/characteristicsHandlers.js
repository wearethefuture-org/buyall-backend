const CharacteristicService = require('../../../services/characteristic');

const getSetting = async ctx => {
    const characteristicService = new CharacteristicService();
    const { id } = ctx.params;
    ctx.response.body = await characteristicService.getCharacteristicSetting(id);
};

module.exports = {
    getSetting
};
