import sequelize from "../services/db"
import Sequelize, { Model, Optional } from "sequelize"
import { IAccount } from "./account"

interface AccountCreationAttributes extends Optional<IAccount, "id">{}

export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount{}

export default sequelize.define<AccountModel>('account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 0,
        allowNull: false
    },
    domain:{
        type: Sequelize.STRING,
        allowNull: true,
    }
})