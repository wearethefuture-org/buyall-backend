const superadmin = {
    first_name: 'superadmin',
    last_name: 'superadmin',
    email: 'superadmin@gmail.com',
    password: '111111',
    status: 'confirmed',
    role: 'superadmin',
    disabled: false,
    img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
    birthday_date: new Date('January 31 1996 00:00'),
    created_at: new Date(),
    updated_at: new Date()
};

const admin = {
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@gmail.com',
    password: '111111',
    status: 'confirmed',
    role: 'admin',
    disabled: false,
    img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
    birthday_date: new Date('January 31 1996 00:00'),
    created_at: new Date(),
    updated_at: new Date()
};

const user = {
    first_name: 'user',
    last_name: 'user',
    email: 'user@gmail.com',
    password: '111111',
    status: 'confirmed',
    role: 'user',
    disabled: false,
    img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
    birthday_date: new Date('January 31 1996 00:00'),
    created_at: new Date(),
    updated_at: new Date()
};

module.exports = {
    superadmin,
    admin,
    user
};