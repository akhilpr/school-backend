import config from "../../config/default";
import * as express from "express";
import log from "../logger";
import { initialiseDatabase } from "../db/db"
import routes from "../routes/routes"
import * as  cors  from "cors";

const app = express();

export const startServer = () => {
    app.use(express.json());
    app.use(cors());
    
    app.listen(config.port, (): void => {
        log.info(`Server Running in 👉 http://localhost:${config.port}`);
        // start database
        initialiseDatabase();
        routes(app);
    });
}