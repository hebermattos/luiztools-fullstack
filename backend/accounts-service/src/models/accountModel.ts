import sequelize from "../services/db"
import Sequelize, { Model, Optional } from "sequelize"
import { IAccount } from "./account"

interface AccountCreationAttributes extends Optional<IAccount, "id"> { }

export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount { }

const accountModel = sequelize.define<AccountModel>('account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
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
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 0,
        allowNull: false
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

function findAll() {
    return accountModel.findAll();
}

function findById(id: number) {
    return accountModel.findByPk<AccountModel>(id);
}

function findByEmail(emailFilter: string) {
    return accountModel.findOne<AccountModel>({where: { email: emailFilter}});
}

function add(account: IAccount){
    return accountModel.create(account);
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<AccountModel>(id);

    if (originalAccount==null) {
        return;
    }

    originalAccount.name = account.name;
    originalAccount.domain = account.domain;
    originalAccount.status = account.status;

    if (account.password) 
        originalAccount.password = account.password;

    await originalAccount.save();

    return originalAccount;
}

export default { findAll, findById, add, set, findByEmail }