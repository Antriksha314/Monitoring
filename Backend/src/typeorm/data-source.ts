import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

const parsedPort = parseInt(process.env.PGPORT || '')
const port = Number.isInteger(parsedPort) ? parsedPort : 6930

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: port,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/entities/*.{js,ts}`],
    subscribers: [],
    migrations: [`${__dirname}/migrations/*.{js,ts}`]
})