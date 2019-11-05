const login = async ctx => {
    ctx.response.body = 'login';
};

const register = async ctx => {
    ctx.response.body = 'register';
};

const confirmRegistration = async ctx => {
    ctx.response.body = 'confirm';
};

const forgotPassword = async ctx => {
    ctx.response.body = 'forgot';
};

module.exports = {
    login,
    register,
    confirmRegistration,
    forgotPassword
}