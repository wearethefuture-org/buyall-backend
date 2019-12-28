module.exports = (token) => {
    return {
        request: {
            headers: {
                'Authorization': `bearer ${token}`
            }
        }
    };
}