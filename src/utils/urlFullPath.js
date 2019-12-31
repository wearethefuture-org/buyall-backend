const config = require('./config');

module.exports = (params) => {
    const { url, port } = config;
    
    return `${url}:${port}${params}`;
}