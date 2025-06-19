import logger from '../logs/logger.js';

export default function errorHandler(error, req, res, next) {
    console.log('Error name', error.name);
    logger.error(error.message);

    if (error.name === 'ValindationError') {
        res.status(400).json({ message: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: error.message})
    } else if (error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError' ||
        error.name === 'SequelizeForeignKeyConstraintError'
    ) {
        res.status(400).json({ message: error.message})
    } else {
        res.status(500).json({ message: error.message})
    }
}