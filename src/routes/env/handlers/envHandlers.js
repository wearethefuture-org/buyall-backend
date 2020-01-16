const getVars = async ctx => {
    const body = {
        PORT: +process.env.PORT || null,
        URL: process.env.URL || null,

        FRONT_PORT: +process.env.FRONT_PORT || null,
        FRONT_URL: process.env.FRONT_URL || null,

        DATABASE_NAME: process.env.DATABASE_NAME || null,
        POSTGRES_USERNAME: process.env.POSTGRES_USERNAME || null,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || null,  
        POSTGRES_HOST: process.env.POSTGRES_HOST || null,

        SENDGRID_API: process.env.SENDGRID_API || null,

        saltRounds: +process.env.saltRounds || null,

        SECRET_KEY: process.env.SECRET_KEY || null,

        TOKEN_TIME: process.env.TOKEN_TIME || null,

        BUCKET_NAME: process.env.BUCKET_NAME || null,
        PROJECT_ID: process.env.PROJECT_ID || null,
        CLOUD_JSON_PATH: process.env.CLOUD_JSON_PATH || null,
        CLOUD_JSON_URL: process.env.CLOUD_JSON_URL || null
    };

    ctx.response.body = body;
};

module.exports = {
    getVars
};