import { DestroyOptions } from "sequelize/types";
import { IAccount } from "./account";
import accountModel, { IAccountModel } from "./accountModel";

function findAll() {
    return accountModel.findAll();
}

function findById(id: number) {
    return accountModel.findByPk<IAccountModel>(id);
}

function findByEmail(emailFilter: string) {
    return accountModel.findOne<IAccountModel>({where: { email: emailFilter}});
}

function add(account: IAccount){
    return accountModel.create(account);
}

function remove(id: number){
    return accountModel.destroy({ where: {id: id}} as DestroyOptions<IAccount>)
}

function removeByEmail(email: string){
    return accountModel.destroy({ where: {email: email}} as DestroyOptions<IAccount>)
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id);

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

export default { findAll, findById, add, set, findByEmail, remove, removeByEmail }