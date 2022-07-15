import { Sequelize } from "sequelize/types";

const database = process.env.DB_NAME!;
const usernane = process.env.DB_USER!;
const password = process.env.DB_PASSWORD!;
const dbhost = process.env.DB_HOST!;

const sequelize = new Sequelize(database, usernane, password, {
    dialect: 'postgres',
    host : dbhost
});

export default sequelize;