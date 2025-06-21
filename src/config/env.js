const requiredEnv = (key) => {
    const value = process.env[key];

    if (!value) {
        throw new Error('Missing environment variable: ' + key);
    }
    return value;
}

const config = {
    PORT: process.env.PORT || 4321,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_USE_SSL: process.env.DB_USE_SSL || false,
    BCRYPT_SALT_ROUND: +process.env.BCRYPT_SALT_ROUND,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_SECONDS: process.env.JWT_EXPIRES_SECONDS,
}

export default config;