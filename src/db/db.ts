import { DataSource } from "typeorm";
import { Admin } from "../model/Admin";
import config from "../../config/default";
import log from "../logger";
import { Students } from "../model/Students";
import { Parent } from "../model/Parents";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.host,
    port: config.dbPort,
    username: config.dbUserName,
    password: config.password,
    database: config.database,
    synchronize: true,
    logging: false,
    entities: [Admin, Students, Parent],
    migrations: [],
    subscribers: [],
});
export const initialiseDatabase = () => {
    AppDataSource.initialize().then(async () => {
        log.info("Connected to database...");
    }).catch(error => log.error(error));
}
