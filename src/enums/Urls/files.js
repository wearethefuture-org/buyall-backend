// TODO: profile route
const singleFilesUrls = [

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
];

module.exports = {
    singleFilesUrls,
    multipleFilesUrls
};