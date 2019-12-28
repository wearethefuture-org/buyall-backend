const PassportUrls = [
    {
        url: '/auth/confirm',
        method: 'POST'
    },
    {
        url: '/users',
        method: 'GET'
    },
    {
        url: '/user/:id',
        method: 'GET'
    },
    {
        url: '/user',
        method: 'POST'
    },
    {
        url: '/user/:id',
        method: 'PUT'
    },
    {
        url: '/user/:id',
        method: 'DELETE'
    },
    {
        url: '/category', 
        method: 'POST'
    },
    {
        url: '/category/:id', 
        method: 'PUT'
    },
    {
        url: '/category/:id', 
        method: 'DELETE'
    },
    {
        url: '/subCategory', 
        method: 'POST'
    },
    {
        url: '/subCategory/:id',
        method: 'PUT'
    },
    {
        url: '/subCategory/:id',
        method: 'DELETE'
    },
    {
        url: '/product', 
        method: 'POST'
    },
    {
        url: '/product/:id', 
        method: 'PUT'
    },
    {
        url: '/product/:id', 
        method: 'DELETE'
    }
];

module.exports = PassportUrls;
