import * as dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();
import {HOUR} from './utils/constants'

interface Config {
  rootUser: {
    password: string
  };
  node_env: string;
  root_path: string;
  server: {
    port: number;
    host: string;
    url: string;
  };
  sequelize: {
    host: string;
    user: string;
    password: string;
    name: string;
    dialect: Dialect;
  };
  cors: {
    origin: string | Array<string>;
    credentials: boolean;
  };
  session: {
    secret: string;
    saveUninitialized: boolean;
    cookie: {
      maxAge: number;
    };
    resave: boolean;
  };
  bcrpyt: {
      salt: number
  };
}
const getConfig = (): Config => {
  
    return {
      rootUser: {
        password: String(process.env.APP_ROOT_USER_PASSWORD)
      },
      node_env: String(process.env.NODE_ENV),
      root_path: String(process.env.SERVER_ROOT_PATH),
      server: {
        port: Number(process.env.SERVER_PORT),
        host: String(process.env.SERVER_HOST),
        url: String(process.env.HOST_URL)
      },
      sequelize: {
        host: String(process.env.DB_HOST),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        name: String(process.env.DB_NAME),
        dialect: process.env.DB_DIALECT as Dialect,
      },
      cors: {
        origin: String(process.env.CORS_ORIGIN).split(','),
        credentials: true,
      },
      session: {
        secret: String(process.env.SESSION_CESRET),
        saveUninitialized: true,
        cookie: {
          maxAge: Number(HOUR) * 24,
        },
        resave: true,
      },
      bcrpyt: {
        salt: Number(process.env.CRYP_SALT)
    }
    };
  
};

const config: Config = getConfig();
export default config;
