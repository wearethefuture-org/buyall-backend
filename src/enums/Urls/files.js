// TODO: profile route
const singleFilesUrls = [
    {
        url: '/user/:id',
        method: 'PUT',
        field: 'file'
    }
];

const multipleFilesUrls = [
    {
        url: '/product',
        method: 'POST',
        fields: [
            {
                name: 'previewImage',
                maxCount: 1
            },
            {
                name: 'images'
            }
        ]
    },
    {
        url: '/product/:id',
        method: 'PUT',
        fields: [
            {
                name: 'previewImage',
                maxCount: 1
            },
            {
                name: 'images'
            }
        ]
    },
];

module.exports = {
    singleFilesUrls,
    multipleFilesUrls
};