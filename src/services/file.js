const BaseModel = require('./baseModel');

class FileService extends BaseModel {
  async getFile(id) {
    return this.model.files.findOne({
      where: {
        id
      }
    });
  }
}

module.exports = FileService;
