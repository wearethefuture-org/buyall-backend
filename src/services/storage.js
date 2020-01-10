const { Storage } = require('@google-cloud/storage');
const path = require('path');

const BaseModel = require('./baseModel');
const config = require('../utils/config');

const root = path.join.bind(this, __dirname, '../../');

class StorageService extends BaseModel {
    constructor() {
        super();

        this.storage = new Storage({
            keyFilename: root(config.cloudConfigPath),
            projectId: config.projectId
        });
        this.baseUrl = 'https://storage.cloud.google.com';

        this.bucket = this.storage.bucket(config.bucketName);
    }

    async uploadFile(file, destination) {
        const fileName = `${Date.now()}_${file.originalname}`;

        this.bucket.file(`${destination}${fileName}`).createWriteStream({
            metadata: {
                contentType: file.mimetype
            },
            resumable: false
        }).end(file.buffer);

        const url = `${this.baseUrl}/${this.bucket.name}/${destination}${fileName}`;

        return await this.model.files.create({
            name: fileName,
            url
        });
    }

    async deleteFile(path) {
        return this.bucket.file(path).delete();
    }
}

module.exports = StorageService;