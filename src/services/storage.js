const { Storage } = require('@google-cloud/storage');
const imagemin = require('imagemin');
const sharp = require('sharp');
const mozjpeg = require('imagemin-mozjpeg');
const isJpg = require('is-jpg');

const BaseModel = require('./baseModel');
const config = require('../utils/config');

class StorageService extends BaseModel {
    constructor() {
        super();

        this.storage = new Storage({
            keyFilename: config.cloudConfigPath,
            projectId: config.projectId
        });
        this.baseUrl = 'https://storage.cloud.google.com';

        this.bucket = this.storage.bucket(config.bucketName);
    }

    async convertToJpg(input) {
        if (isJpg(input)) {
            return input;
        }

        return sharp(input) 
            .jpeg()
            .toBuffer();
    }

    async uploadFile(file, destination, fileFields = {}) {
        const buffer = await imagemin.buffer(file.buffer, {
            plugins: [this.convertToJpg, mozjpeg({ quality: 85 })]
        });

        const fileName = `${Date.now()}_${file.originalname}`;

        this.bucket.file(`${destination}${fileName}`).createWriteStream({
            metadata: {
                contentType: 'image/jpeg'
            },
            resumable: false
        }).end(buffer);

        const url = `${this.baseUrl}/${this.bucket.name}/${destination}${fileName}`;

        const fileBody = Object.assign({
            name: fileName,
            url
        }, fileFields);

        return await this.model.files.create(fileBody);
    }

    async deleteFile(path) {
        return this.bucket.file(path).delete();
    }
}

module.exports = StorageService;