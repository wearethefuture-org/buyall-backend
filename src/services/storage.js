const { Storage } = require('@google-cloud/storage');
const path = require('path');
const BaseModel = require('./baseModel');

class StorageService extends BaseModel {
    constructor() {
        super();

        this.storage = new Storage({
            keyFilename: path.join(__dirname, '../../storage.json'),
            projectId: 'river-nectar-258421'
        });
        this.baseUrl = 'https://storage.cloud.google.com';

        this.bucket = this.storage.bucket('files-storage-local');
    }

    async uploadFile(file, destination) {
        const fileName = `${Date.now()}_${file.originalname}`;

        this.bucket.file(`${destination}/${fileName}`).createWriteStream({
            metadata: {
                contentType: file.mimetype
            },
            resumable: false
        }).end(file.buffer);
        
        const url = `${this.baseUrl}/${this.bucket.name}/${destination}/${fileName}`;

        return await this.model.files.create({
            name: file.originalname,
            url
        });
    }
}

module.exports = StorageService;