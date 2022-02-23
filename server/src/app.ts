import config from './config';
import express, {Application} from 'express';
import log from './utils/logging/logger';
import connectDb from './utils/sequelize/connect';
import routes from './routes';

const port = config.server.port;
const host= config.server.host;
const app: Application = express();
routes(app);





    app.listen( port, () => {
        log.info(`server running on port ${port}`);
        connectDb()
 
    })


export default app
