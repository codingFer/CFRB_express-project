import bcrypt from 'bcrypt';
import config from '../config/env.js';
import logger from '../logs/logger.js';

export const encriptar = async (text) => {
    try {
        const saltRounds = config.BCRYPT_SALT_ROUND;
        const hash = await bcrypt.hash(text, saltRounds);
        return hash;
    } catch (error) {
        logger.error(error);
        throw new Error('Error al encriptar');
    }
}

export const dencriptar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error);
        throw new Error('Error al dencriptar');
    }
}

export const comparar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error);
        throw new Error('Error al dencriptar');
    }
}


export default {
    encriptar,
    dencriptar
};