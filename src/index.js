import "dotenv/config"
import app from "./app.js";
import logger from "./logs/logger.js";
// import process from "dotenv/config"
import config from "./config/env.js";
import { sequelize } from "./database/database.js";

async function main() {
    await sequelize.sync({ force: false })
    // await sequelize.sync({ force: true })
    const port = config.PORT ;
    app.listen(port || 4320);
    console.log(`Server is running on localhost:${port || 4320}`);
    logger.info(`Server is started on localhost:${port || 4320}`);
    logger.error(`Server is started on localhost:${port || 4320}`);
    logger.warn(`Server is started on localhost:${port || 4320}`);
    logger.fatal(`Server is started on localhost:${port || 4320}`);
}

main();
